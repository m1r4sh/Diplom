/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "promua-group.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
