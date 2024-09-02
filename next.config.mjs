/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nextScriptWorkers: true,
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
