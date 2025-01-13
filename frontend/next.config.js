const webpack = require('webpack')

const rest_api_env = JSON.stringify(process.env.REST_API);
console.log(`[ENV]: Using Rest API at ${rest_api_env}`);

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
        REST_API: rest_api_env
      }),
    );
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig;