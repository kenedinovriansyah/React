const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    historyApiFallback: true,
    open: 'Google Chrome',
    proxy: [
      {
        context: ['/api', '/media'],
        target: 'http://localhost:8000',
        secure: true,
      },
    ],
  },
});
