import { terser } from "rollup-plugin-terser";

export default {
  input: 'toc-generate/tocGenerate.js',
  output: {
    file: 'dist/toc-generate.js',
    name: 'tocGenerate',
    format: 'es',
    compact: true,
    minifyInternalExports: true,
  },
  plugins: [terser()]
};