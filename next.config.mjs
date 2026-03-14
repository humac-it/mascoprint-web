/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // 301 redirects from old WordPress URLs to new Next.js routes
  async redirects() {
    return [
      // Slug change: R&D case study
      {
        source: '/case-studies/rd',
        destination: '/case-studies/r-and-d',
        permanent: true,
      },
      // Pages removed in migration
      {
        source: '/news',
        destination: '/',
        permanent: true,
      },
      {
        source: '/consultancy',
        destination: '/services',
        permanent: true,
      },
      // Old blog posts
      {
        source: '/used-cp12-machines-for-sale',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/for-sale/used-cp12-mahines-for-sale',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/for-sale/:slug',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/opening-hours',
        destination: '/contact',
        permanent: true,
      },
      // WordPress upload paths
      {
        source: '/wp-content/uploads/:path*',
        destination: '/',
        permanent: true,
      },
      // WordPress admin/login paths (prevent 404s from bots)
      {
        source: '/wp-admin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
    ]
  },

  images: {
    // Cloudflare Pages doesn't support Next.js image optimization at the edge.
    // Use <img> with pre-optimised assets, or enable Cloudflare Image Resizing
    // on a paid plan for on-the-fly transforms.
    unoptimized: true,
  },
  poweredByHeader: false,

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  experimental: {
    scrollRestoration: true,
  },
}

export default nextConfig
