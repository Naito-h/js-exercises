import { JestConfigWithTsJest } from "ts-jest";

// NOTE: jest.config.ts を TypeScript で記述するためには ts-node が必要
export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  // ES Modulesの設定
  extensionsToTreatAsEsm: ['.ts'],
  // 環境設定
  testEnvironment: 'node',
  // TypeScriptおよびJavaScriptファイルの変換設定
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true
    }],
    '^.+\\.jsx?$': ['ts-jest', {
      useESM: true
    }]
  },
  // モジュール名のマッピング（.tsファイルのインポートを許可）
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // see default value: https://jestjs.io/docs/configuration#testmatch-arraystring
  testMatch: ["**/?(*.)+(test).(cjs|[jt]s?(x))"],
} satisfies JestConfigWithTsJest;
