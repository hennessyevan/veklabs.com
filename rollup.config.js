import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import { readdirSync } from "fs"
import { join } from "path"

const extensions = [".ts"]
const tsPath = join(__dirname, "src/ts")
const bundleNames = readdirSync(tsPath, {
 withFileTypes: true,
})
 .filter((entry) => entry.isDirectory())
 .map(($) => $.name)

const input = {}
for (const name of bundleNames) {
 input[name] = `src/ts/${name}/index.ts`
}

export default {
 input,
 plugins: [
  resolve({ extensions }),
  commonjs(),
  babel({
   extensions,
   babelHelpers: "runtime",
   include: ["src/**/*.ts"],
   exclude: ["*.d.ts"],
  }),
 ],
 output: [
  {
   dir: "assets/js",
   format: "iife",
  },
  {
   dir: "assets/js/module",
   format: "esm",
  },
 ],
}
