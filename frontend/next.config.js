const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
        REST_API: JSON.stringify(process.env.REST_API),
      }),
    );
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}
