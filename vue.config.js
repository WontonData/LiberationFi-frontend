module.exports = {
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  runtimeCompiler: false,
  configureWebpack: {
    resolve: {
      //extensions: [],
      alias: {
        //"@": "src"
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "views": "@/views",
        "image": "@/assets/image",
        "store": "@/store"
      }
    }
  },

  devServer: {
    open:false,
    hot:true,
    proxy: {
      "/api": {
        target: "https://api.51tracking.com",
        ws: true,
        // secure: false,
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true,
        logLevel: "debug"
      }

    }
  }
}
