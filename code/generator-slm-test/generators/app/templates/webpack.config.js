
// module.exports = {
//   mode: 'development',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     path: './public',
//     filename: 'index.js'
//   }
// }

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/react","@babel/env",]
          }
        }
      }
    ]
  }
};