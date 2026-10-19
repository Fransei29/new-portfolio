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
    // 404 propio para todo el sitio. El layout raíz vive en app/[lang], y con
    // un layout raíz bajo un segmento dinámico not-found.tsx no atrapa las
    // rutas inexistentes: Next devolvía un documento de error vacío.
    globalNotFound: true,
  },
  reactStrictMode: true, // Asegura que el código esté más optimizado y sin errores
  // Demos para clientes: URL limpia y fuera de los buscadores
  async rewrites() {
    return [{ source: '/demos/:slug', destination: '/demos/:slug.html' }];
  },
  async headers() {
    return [
      {
        source: '/demos/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
