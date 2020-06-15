const production = !process.env.ROLLUP_WATCH;
const path = require('path');

const devServerOptions = {
  protocol: 'http',
  host: 'localhost',
  port: '4000'
};
const root = __dirname;
const buildPath = p => path.resolve(root, p);
const folders = {
  root,
  dist: buildPath('public'),
  src: buildPath('src'),
  components: path.resolve(root, './src/components'),
  libs: path.resolve(root, './src/libs'),
};

module.exports = {
  input: 'src/main.js',
  output: [{
    dir: folders.dist,
    entryFileNames: 'main.[format].js',
    sourcemap: !production,
    format: 'amd',
  }, {
    dir: folders.dist,
    entryFileNames: 'main.[format].js',
    sourcemap: !production,
    format: 'es',
  }],

  preserveEntrySignatures: false,

  watch: { clearScreen: false },

  plugins: [
    require('@rollup/plugin-alias')({
      entries: folders
    }),

    require('rollup-plugin-node-resolve')({
      browser: true,
      mainFields: ['svelte', 'browser', 'module', 'main'],
      extensions: ['.mjs', '.js', '.svelte'],
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),

    require('rollup-plugin-commonjs')(),

    require('rollup-plugin-svelte')({ dev: !production }),

    !production && require('rollup-plugin-livereload')(folders.dist),

    !production && require('rollup-plugin-serve')({
      host: devServerOptions.host,
      port: devServerOptions.port,
      contentBase: folders.dist
    }),

    require('@rollup/plugin-replace')({
      'process.env.DEV': JSON.stringify(!production)
    }),

    production && require('rollup-plugin-cleaner')({
      targets: [ folders.dist ]
    }),

    require('rollup-plugin-copy')({
      targets: [
        { src: ['src/static/*'], dest: folders.dist },
      ]
    }),
  ]
};
