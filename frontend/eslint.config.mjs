import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      eslintConfigPrettier],
    files: ["**/*.{ts,tsx}"],
    ignores: ["cypress/**", "cypress.config.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: './tsconfig.json',
      },
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      prettier,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "prettier/prettier": "error",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["cypress/**/"], 
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      }
    }
  }
);
