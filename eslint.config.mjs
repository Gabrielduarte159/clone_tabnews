import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import jest from "eslint-plugin-jest";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  {
    ...jest.configs["flat/recommended"],
    files: ["tests/**/*.js"],
  },
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
