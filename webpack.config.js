var path = require('path');
module.exports = {
  entry: __dirname + "/src/app.js",
  output: {
    path:  __dirname + "/dist/waveform-playlist/js",
    publicPath: "/waveform-playlist/js/",
    filename: 'waveform-playlist.var.js',
    library: 'WaveformPlaylist',
    libraryTarget: 'var'
  },
  devServer: {
    contentBase: './dist',
    inline: false,
  },
  devtool: "#source-map",
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};