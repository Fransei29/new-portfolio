/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  webpack(config, { isServer }) {
    // Optimización de los chunks solo para el cliente (no servidor)
    if (!isServer) {
      // Aseguramos que la optimización de chunks esté habilitada
      if (config.optimization && config.optimization.splitChunks) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          maxSize: 200000, // Optimización del tamaño máximo de los chunks
        };
      }
    }

    // Configuración para manejar archivos SVG con SVGR
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  experimental: {
    optimizeCss: true, // Optimiza el CSS
    scrollRestoration: true, // Mejora el control de scroll
  },
  reactStrictMode: true, // Asegura que el código esté más optimizado y sin errores
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
