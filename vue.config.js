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

        /*
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
        */
    },

    chainWebpack: config => {
        config.module.rules.delete('eslint');


        // 添加svg-sprite-loader
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .tap(options => {
                options = {
                    symbolId: 'icon-[name]'
                }
                return options
            })

        /*   config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
          config.module
              .rule('svg-sprite-loader')
              .test(/\.svg$/)
              .include
              .add(resolve('src/icons')) // 处理svg目录
              .end()
              .use('svg-sprite-loader')
              .loader('svg-sprite-loader')
              .options({
                  symbolId: 'svg-[name]'
              }) */

        // config.module
        //     .rule('svg')
        //     .test(() => false)
        //     .use('file-loader')
    },

    lintOnSave: false,

    //反向代理
    devServer: {
        // 环境配置
        // host: '127.0.0.1',
        port: 8080,
        https: false,
        //hotOnly: false,
        //open: true, //配置自动启动浏览器
        proxy: {
            '/jy_innovative_system': {
                target: 'http://192.168.0.29:8080/jy_innovative_system/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/jy_innovative_system': ''
                }
            }
        }
    }
}