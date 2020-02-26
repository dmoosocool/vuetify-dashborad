module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/auth": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
