/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Exclude svg from the default file-loader or url-loader
    const assetRule = config.module.rules.find(rule =>
      rule && rule.test && rule.test instanceof RegExp && rule.test.test(".svg"),
    );
    if (assetRule) {
      assetRule.exclude = assetRule.exclude || [];
      assetRule.exclude.push(/\.svg$/i);
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
