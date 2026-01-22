const nextConfig = {
  output: 'export',
  // GitHub Pages usually serves at /<repo-name>
  basePath: '/wildholz-pitch-deck',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
