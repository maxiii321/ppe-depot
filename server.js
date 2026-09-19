const express = require('express');
const path = require('path');

const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images) from public directory if you have one
app.use(express.static(path.join(__dirname, 'public')));

// Sample API Route for PPE Depot
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'PPE Depot API is running on Netlify!',
    timestamp: new Date()
  });
});

// Home route / client review route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>PPE Depot - Client Review</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; text-align: center; background-color: #f4f6f9; }
          .container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; }
          h1 { color: #2c3e50; }
          p { color: #7f8c8d; }
          .status { display: inline-block; padding: 8px 16px; background-color: #2ecc71; color: white; border-radius: 20px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>PPE Depot Application</h1>
          <p class="status">Live 24/7 Online</p>
          <p>Client review build deployed successfully on Netlify.</p>
        </div>
      </body>
    </html>
  `);
});

// IMPORTANT FOR LOCAL DEVELOPMENT ONLY:
// Server will only listen on a local port if NOT running on Netlify/Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

// CRITICAL FOR NETLIFY / VERCEL SERVERLESS:
module.exports = app;