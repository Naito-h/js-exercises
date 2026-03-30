import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

// format_sample.js のパースエラー(重複宣言)を回避するためのカスタムプロセッサ
const formatSamplePlugin = {
  processors: {
    "allow-parse-errors": {
      preprocess(text) {
        return [text];
      },
      postprocess(messages) {
        return messages[0].filter((msg) => !msg.fatal); // パースエラーを無視して、その他のメッセージだけを返す
      },
    },
  },
};

export default defineConfig([
  {
    files: ["ex01/format_sample.js"],
    plugins: { js, "format-sample": formatSamplePlugin },
    extends: ["js/recommended"],
    processor: "format-sample/allow-parse-errors",
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ["**/*.{js}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-var": "error",  // varを禁止
      "prefer-const": "error",  // constを優先
      "one-var": ["error", "never"], // 変数宣言は1行につき1つまで
      "no-array-constructor": "error", // Arrayコンストラクタの使用を禁止
      "no-new-object": "error", // Objectコンストラクタの使用を禁止
      "no-new-func": "error", // Functionコンストラクタの使用を禁止
      "no-with": "error", // with文の使用を禁止
      "no-eval": "error", // evalの使用を禁止
      "no-new-wrappers": "error", // プリミティブラッパーオブジェクトの使用を禁止
      "new-parens": "error",  // new演算子を使用する際は、関数呼び出しの括弧を省略しない
      "eqeqeq": ["error", "always"] // ===と!==を使用
    },
  },
]);
