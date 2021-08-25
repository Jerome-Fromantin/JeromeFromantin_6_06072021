const path = require('path');

module.exports = {
    mode: 'production',
    entry: {index: "./javascript/scripts-accueil.js", photographe: "./javascript/scripts-photographe.js"},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    }
};