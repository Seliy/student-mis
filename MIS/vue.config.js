module.exports = {
    devServer: {
      before: require('./mock/index.js')//引入mock/js文件
    }
  };