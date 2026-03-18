const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  extensions: ['html'],
  maxAge: '1d'
}));

// Handle clean URLs (e.g., /training -> /training.html)
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'dist', req.path + '.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`PS Safety website running on port ${PORT}`);
});
