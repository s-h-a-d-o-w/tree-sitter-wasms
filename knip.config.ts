import type { KnipConfig } from "knip";

export default {
  // Grammars and the tree-sitter CLI are resolved at runtime by build.ts, not imported.
  ignoreDependencies: ["tree-sitter-.*"],
  ignore: ["test/fixtures/**"],
} satisfies KnipConfig;
