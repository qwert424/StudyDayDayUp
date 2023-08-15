const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

if (process.env.NODE_ENV === 'production') {
    // 生产环境配置
    module.exports = {
        plugins: [new BundleAnalyzerPlugin()],
        externals: {
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
            axios: "axios"
        }
    }
} else {
    // 开发环境配置
    module.exports = {
    }
}