import type { KnipConfig } from "knip";

export default {
  // Grammars and the tree-sitter CLI are resolved at runtime by build.ts, not imported.
  ignoreDependencies: ["tree-sitter-.*"],
  // Parser input samples, not source files.
  ignore: ["test/fixtures/**"],
} satisfies KnipConfig;
