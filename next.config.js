module.exports = {
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Set desired value here
    }
  }
};
