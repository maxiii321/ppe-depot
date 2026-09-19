const express = require('express');
const serverless = require('serverless-http');

// Import your Express app from server.js
const app = require('../../server.js');

module.exports.handler = serverless(app);