const { resolve } = require('path');
const SveltePreprocess = require('svelte-preprocess');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const distPath = process.env.DIST_PATH ?? './docs';

if (typeof process.env.NODE_ENV !== 'string') process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV === 'development';

const cssLoader = 'css-loader';
const sourceMapLoader = 'source-map-loader';
const pPath = isDev ? '/' : '/screen-recorder/';

const cssPlugin = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

const plugins = [];
plugins.push(
  new CopyPlugin({
    patterns: [
      { from: 'icons/generated', to: 'icons' },
      {
        from: 'webmanifest.js',
        to: 'manifest.webmanifest',
        transform: content => require('./webmanifest')(pPath),
      },
    ],
  }),
  new HtmlWebpackPlugin({
    inject: 'head',
    minify: true,
    scriptLoading: 'defer',
  })
);
if (!isDev)
  plugins.push(
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: 'index.html',
      exclude: [/^.*icons\/.*\.png$/, /\.map$/],
    })
  );
const config = {
  entry: { app: '@/App' },
  module: {
    rules: [
      {
        test: /\.svelte$/i,
        loader: 'svelte-loader',
        options: {
          preprocess: SveltePreprocess(),
          emitCss: !isDev,
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: [cssPlugin, cssLoader, sourceMapLoader],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    alias: {
      '@': resolve('src'),
    },
  },
  plugins,
  output: {
    filename: 'js/[name].js',
    assetModuleFilename: 'assets/[name][ext][query]',
    path: resolve(distPath),
    clean: true,
    publicPath: 'auto',
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  // // Not required for small projects
  // cache: {
  //   type: 'filesystem',
  //   cacheDirectory: resolve('webpack-cache'),
  // },
  devServer: {
    port: 3000,
  },
};
module.exports = config;
