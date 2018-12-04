const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
// vue.config.js
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
        }
        var rules = [];
        rules.push({
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('src/icons')],
            options: {
                symbolId: 'icon-[name]'
            }
        })
        config.module.rules = [
            ...config.module.rules,
            ...rules
        ]

    },

    chainWebpack: config => {
        config.module.rules.delete('eslint');
        config.module
            .rule('svg')
            .test(() => false)
            .use('file-loader')
    },

    lintOnSave: false
}