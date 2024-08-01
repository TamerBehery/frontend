/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"
      , "scontent.fcai20-1.fna.fbcdn.net"
      , "scontent.fcai20-2.fna.fbcdn.net"
      , "scontent.fcai20-3.fna.fbcdn.net"
      , "scontent.fcai20-4.fna.fbcdn.net"
      , "scontent.fcai20-5.fna.fbcdn.net"
      , "scontent.fcai20-6.fna.fbcdn.net"
      , "scontent.fcai20-7.fna.fbcdn.net"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
