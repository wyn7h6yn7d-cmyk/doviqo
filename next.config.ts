import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid root inference issues when other lockfiles exist on the machine.
    root: __dirname,
  },
};

export default nextConfig;
