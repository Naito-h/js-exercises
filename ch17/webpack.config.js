import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  name: "ex05",
  mode: "development",
  entry: "./ex05/src/index.js",
  module: {
    rules: [
      {
        test: /\.mp3$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "ex05/dist"),
    clean: false,
  },
  // ソースマップを追加
  devtool: "source-map",
};