const path = require('path');

module.exports = {
    mode: 'production',
    entry: {index: "./scripts-accueil.js", photographe:  "./scripts-photographe.js"},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};