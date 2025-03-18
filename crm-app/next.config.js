/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification to use Terser instead
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    // Handle problematic modules
    config.module.rules.push({
      test: /\.m?js$/,
      include: [
        /node_modules\/(firebase|@firebase|undici)/,
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                node: 'current',
              },
            }],
          ],
          plugins: [
            '@babel/plugin-transform-private-methods',
            '@babel/plugin-transform-class-properties'
          ]
        }
      }
    });

    return config;
  }
};

module.exports = nextConfig; 