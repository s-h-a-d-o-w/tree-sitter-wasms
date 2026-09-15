import { exec as execCallback } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { PromisePool } from "@supercharge/promise-pool";
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
  "@tree-sitter-grammars/tree-sitter-zig",
  "@tlaplus/tree-sitter-tlaplus",
  "@willjouo/tree-sitter-r",
].filter((s) => !langArg || s === langArg);

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
      await exec(`pnpm tree-sitter generate`, { cwd });
    }
    await exec(
      `pnpm tree-sitter build --wasm --output ${outDir}/${name.includes("/") ? name.split("/").pop() : name}.wasm`,
      { cwd },
    );

    console.log(`✅ Finished building ${label}`);
  } catch (error) {
    failures.push([label, error]);
  }
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

await PromisePool.withConcurrency(os.cpus().length)
  .for(grammars)
  .process(async (name) => {
    if (name === "tree-sitter-rescript") {
      await buildParserWASM(name, { generate: true });
    } else if (name === "tree-sitter-ocaml") {
      await buildParserWASM(name, { subPath: "ocaml" });
    } else if (name === "tree-sitter-php") {
      await buildParserWASM(name, { subPath: "php" });
    } else if (name === "tree-sitter-typescript") {
      await buildParserWASM(name, { subPath: "typescript" });
      await buildParserWASM(name, { subPath: "tsx" });
    } else {
      await buildParserWASM(name);
    }
  });

if (failures.length > 0) {
  failures.forEach(([label, error]) => {
    console.error(`🔥 Failed to build ${label}:\n`, error);
  });
  process.exit(1);
}
