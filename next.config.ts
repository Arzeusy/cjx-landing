import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/corona.ico", // puedes poner también /:path* para todo public
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ]
  },
  images: {
    // Allow loading images from Supabase Storage public bucket host
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eabdujymuudmoyuopddk.supabase.co",
        port: "",
        pathname: "/storage/v1/**",
      },
    ],
  },
}

export default nextConfig