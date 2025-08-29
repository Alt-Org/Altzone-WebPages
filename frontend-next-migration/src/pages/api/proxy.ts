
// proxy.ts
// Sets up a Next.js API route that proxies requests to the backend API (devapi.altzone.fi)
// This is used to bypass CORS issues and keep API calls relative in the frontend
import { createProxyMiddleware } from 'http-proxy-middleware';

// Disable body parsing for proxy requests
export const config = {
  api: {
    bodyParser: false,
  },
};

// Create the proxy middleware
const proxy = createProxyMiddleware({
  target: 'https://devapi.altzone.fi', // Backend API base URL
  changeOrigin: true,                  // Needed for virtual hosted sites
  pathRewrite: { '^/api/proxy': '' },  // Remove /api/proxy prefix before forwarding
});

export default proxy;
