import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const dndBuild = {
  input: 'src/Dnd.ts',
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'umd', name: 'Dnd' }
  ],
  plugins: [
    resolve({
      extensions: ['.ts', '.js', '.json'],
    }),
    svelte(),
    commonjs(),
  ]
};

const examples = () => ({
  input: 'examples/examples.ts',
  output: { file: 'examples/build/examples.js', format: 'iife' },
  plugins: [
    serve('examples'),
    livereload('examples'),
    resolve({
      extensions: ['.ts', '.js', '.json'],
    }),
    svelte(),
    commonjs(),
  ]
});

const exportConfig = [dndBuild];

!isProd && exportConfig.push(examples());

export default exportConfig;
