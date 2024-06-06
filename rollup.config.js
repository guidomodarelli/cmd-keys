import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const isProduction = process.env.NODE_ENV === "production";

const plugins = [];

if (isProduction) {
  plugins.push(
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    })
  );
} else {
  plugins.push(
    serve(),
    livereload({
      delay: 300,
    })
  );
}

export default {
  input: "src/cmd-keys.ts",
  output: {
    file: "dist/cmd-keys.bundled.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [typescript(), ...plugins],
};
