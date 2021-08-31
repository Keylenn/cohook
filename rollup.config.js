import babel from "rollup-plugin-babel"
import typescript from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json"

const extensions = [".js", ".jsx", ".ts", ".tsx"]
const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
]

export default [
  // CommonJS
  {
    input: "src/index.ts",
    output: {
      file: "lib/cohook.js",
      format: "cjs",
      indent: false,
      exports: "named",
    },
    external,
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        runtimeHelpers: true,
      }),
      terser({
        ecma: 5,
        ie8: true,
        safari10: true,
      }),
    ],
  },
]
