/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "petroteknoapp-dev.sgp1.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.petroteknoapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
