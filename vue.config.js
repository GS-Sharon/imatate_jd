const setApp = require('./src/api/index')
module.exports = {
    configureWebpack: {
        devServer: {
            port: '8090', //运行端口
            open: true,  //启动时是否自动打开页面
            // Mock数据
            before(app) {
                console.log()
                setApp(app)
            }
        }
    },
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            }
        }
    },

    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    }
}
