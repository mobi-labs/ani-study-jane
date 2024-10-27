/**
 * Rollup 설정 모듈
 *
 * @author RWB
 * @since 2022.06.06 Mon 17:44:31
 */

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-sass";
import { terser } from "rollup-plugin-terser";
import { createRequire } from "node:module";

const requireFile = createRequire(import.meta.url);
const pkg = requireFile("./package.json");

const config = [
  {
    external: [/node_modules/],
    input: "./src/index.ts",
    output: [
      {
        dir: "./dist",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        file: pkg.module,
        format: "es",
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        extensions,
        include: ["src/**/*"],
        presets: ["@babel/preset-react"],
      }),
      commonjs({ include: "node_modules/**" }),
      resolve(),
      peerDepsExternal(),
      typescript({ tsconfig: "./tsconfig.json" }),
      scss({
        output: true,
        failOnError: true,
        outputStyle: "compressed",
      }),
      terser(),
    ],
  },
];

export default config;
