const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  //여기서 웹팩설정과 next 설정 모두 바꿀 수 있음
  //hidden-source-map 안하면 배포환경에서 소스코드 다 노출됨 개발할 떄는 eval
  module.exports = withBundleAnalyzer({
    compress: true, //압축 https://nextjs.org/docs/api-reference/next.config.js/compression
    webpack(config, { webpack }) {
      const prod = process.env.NODE_ENV === 'production';
      return {
        ...config,
        mode: prod ? 'production' : 'development',
        devtool: prod ? 'hidden-source-map' : 'eval',
        plugins: [
          ...config.plugins,
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ],
      };
    },
  });