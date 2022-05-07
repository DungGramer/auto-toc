import { terser } from "rollup-plugin-terser";

export default {
  input: 'toc/toc.js',
  output: {
    file: 'dist/toc.min.js',
    name: 'toc',
    format: 'es',
    compact: true,
    minifyInternalExports: true,
  },
  plugins: [terser()]
};