import fs from "node:fs/promises";
import { parentPort, workerData } from "node:worker_threads";
import { Language, Parser } from "web-tree-sitter";
import type { WorkerData } from "./parsers.test.js";

const { fixturePath, wasmPath } = workerData as WorkerData;

await Parser.init();

const language = await Language.load(await fs.readFile(wasmPath));
const parser = new Parser();
parser.setLanguage(language);

try {
  const tree = parser.parse(await fs.readFile(fixturePath, "utf8"));
  parentPort?.postMessage({ hasError: tree?.rootNode.hasError ?? true });
} finally {
  parser.delete();
}
