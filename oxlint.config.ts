import sharedConfig from "@s-h-a-d-o-w/oxlint-config/lintNodeOnly.js";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [sharedConfig],
  ignorePatterns: ["test/fixtures"],
  env: {
    node: true,
  },
});
