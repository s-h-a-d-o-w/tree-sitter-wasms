import { exec as execCallback } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import findRoot from "find-root";
import packageInfo from "./package.json" with { type: "json" };

const exec = promisify(execCallback);

// oxlint-disable-next-line unicorn/no-unreadable-array-destructuring
const [, , langArg] = process.argv;
const outDir = path.join(import.meta.dirname, "out");
const failures: [string, unknown][] = [];
const grammars = [
  ...Object.keys(packageInfo.devDependencies).filter(
    (n) => n.startsWith("tree-sitter-") && n !== "tree-sitter-cli",
  ),
  "@elm-tooling/tree-sitter-elm",
  "@tlaplus/tree-sitter-tlaplus",
  "@tree-sitter-grammars/tree-sitter-yaml",
  "@tree-sitter-grammars/tree-sitter-zig",
  "@davisvaughan/tree-sitter-r",
].filter((s) => !langArg || s === langArg);
// Not `pnpm tree-sitter` because that can resolve to the `tree-sitter` within some grammar packages.
const treeSitterCli = path.join(
  import.meta.dirname,
  "node_modules",
  ".bin",
  "tree-sitter",
);

async function buildParserWASM(
  name: string,
  { subPath, generate }: { subPath?: string; generate?: boolean } = {},
) {
  const label = subPath ? path.join(name, subPath) : name;
  console.log(`⏳ Building ${label}`);

  try {
    let packagePath;
    try {
      packagePath = findRoot(require.resolve(name));
    } catch {
      packagePath = path.join(import.meta.dirname, "node_modules", name);
    }

    const cwd = subPath ? path.join(packagePath, subPath) : packagePath;
    if (generate) {
      await exec(`${treeSitterCli} generate`, { cwd });
    }
    await exec(
      `${treeSitterCli} build --wasm --output ${outDir}/${name.includes("/") ? name.split("/").pop() : name}.wasm`,
      { cwd },
    );

    console.log(`✅ Finished building ${label}`);
  } catch (error) {
    failures.push([label, error]);
  }
}

async function buildGrammar(name: string) {
  if (name === "tree-sitter-rescript") {
    await buildParserWASM(name, { generate: true });
  } else if (name === "tree-sitter-ocaml") {
    await buildParserWASM(name, { subPath: "grammars/ocaml" });
  } else if (name === "tree-sitter-php") {
    await buildParserWASM(name, { subPath: "php" });
  } else if (name === "tree-sitter-typescript") {
    await buildParserWASM(name, { subPath: "typescript" });
    await buildParserWASM(name, { subPath: "tsx" });
  } else {
    await buildParserWASM(name);
  }
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

// The CLI downloads the WASI SDK into a shared cache on first use, which corrupts
// that cache if several builds race for it. So the first build has to run alone.
const [firstGrammar, ...remainingGrammars] = grammars;
if (firstGrammar) {
  await buildGrammar(firstGrammar);
}
await Promise.all(remainingGrammars.map((grammar) => buildGrammar(grammar)));

if (failures.length > 0) {
  failures.forEach(([label, error]) => {
    console.error(`🔥 Failed to build ${label}:\n`, error);
  });
  process.exit(1);
}
