const serverless = require('serverless-http');
const app = require('../../server.js');

// Export the serverless function handler required by Netlify
module.exports.handler = serverless(app);