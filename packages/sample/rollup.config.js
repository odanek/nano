import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: ['src/index.ts', 'src/cli.ts'],
  output: {
    dir: 'dist',
  },
  external: [/node_modules/],
  plugins: [nodeResolve(), commonjs(), typescript()]
};