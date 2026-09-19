const express = require('express');
const path = require('path');

const app = express();

// Middleware to parse form and JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route: Automatically serves account.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

// Explicit routes for your pages
app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

app.get('/basket', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'basket.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// API health check route
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', app: 'PPE Depot' });
});

// Port listener for local execution
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`PPE Depot running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;