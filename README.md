[![npm version](https://img.shields.io/npm/v/@s-h-a-d-o-w/tree-sitter-wasms)](https://www.npmjs.com/package/@s-h-a-d-o-w/tree-sitter-wasms)

# tree-sitter-wasms

Prebuilt WASM binaries for tree-sitter's language parsers. Forked from https://github.com/Gregoor/tree-sitter-wasms to update everything and support current `web-tree-sitter`. (Also automated dependabot updates, which will hopefully keep maintenance burden to a minimum.)

## Installation

```bash
pnpm add @s-h-a-d-o-w/tree-sitter-wasms
# or
yarn add @s-h-a-d-o-w/tree-sitter-wasms
# or
npm install @s-h-a-d-o-w/tree-sitter-wasms
```

## Usage

```ts
import treeSitterRust from "@s-h-a-d-o-w/tree-sitter-wasms/out/tree-sitter-rust.wasm";
parser.setLanguage(treeSitterRust);
```

## Supported Languages

See https://unpkg.com/browse/@s-h-a-d-o-w/tree-sitter-wasms@latest/out/.
