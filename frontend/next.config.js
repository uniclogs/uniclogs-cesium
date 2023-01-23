const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
        BACKEND_PORT: JSON.stringify(process.env.BACKEND_PORT),
      }),
    );
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}
