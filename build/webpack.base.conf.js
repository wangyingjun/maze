const path = require('path');
function resolve(dir){
    return path.join(__dirname, '..', dir)
}
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    }
};