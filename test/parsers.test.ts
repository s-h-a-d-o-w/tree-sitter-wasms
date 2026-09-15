import fs from "node:fs/promises";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { describe, expect, it } from "vitest";

export type WorkerData = {
  fixturePath: string;
  wasmPath: string;
};

const outDir = path.join(import.meta.dirname, "..", "out");
const fixturesDir = path.join(import.meta.dirname, "fixtures");
const workerUrl = new URL("parsers.worker.ts", import.meta.url);

const wasmFiles = (await fs.readdir(outDir, { recursive: true }))
  .filter((file) => file.endsWith(".wasm"))
  .toSorted();

const fixturesByGrammar = new Map(
  (await fs.readdir(fixturesDir)).map((file) => [path.parse(file).name, file]),
);

function parseFixture(wasmPath: string, fixturePath: string) {
  return new Promise<boolean>((resolve, reject) => {
    // Each parser runs in its own worker because a wasm that fails to load leaves the
    // shared emscripten instance unusable for every parser loaded afterwards.
    const worker = new Worker(workerUrl, {
      workerData: { fixturePath, wasmPath } satisfies WorkerData,
    });

    worker.on("message", (message: { hasError: boolean }) => {
      resolve(message.hasError);
    });
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

describe("built parsers", () => {
  it("exist", () => {
    expect(wasmFiles.length).toBeGreaterThan(0);
  });

  it.each(wasmFiles)("%s parses its fixture", async (wasmFile) => {
    const grammar = path.parse(wasmFile).name;
    const fixture = fixturesByGrammar.get(grammar);
    if (!fixture) {
      throw new Error(`No fixture found for ${grammar} in ${fixturesDir}`);
    }

    const hasError = await parseFixture(
      path.join(outDir, wasmFile),
      path.join(fixturesDir, fixture),
    );

    expect(hasError, `${fixture} contains syntax errors`).toBe(false);
  });
});
