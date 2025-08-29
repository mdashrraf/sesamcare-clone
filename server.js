const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the current directory
app.use(express.static('.'));

// For any other request, serve the closest index.html file
app.get('*', (req, res) => {
    // Remove query parameters and hash
    const cleanPath = req.path.split('?')[0].split('#')[0];
    
    // Try to serve the exact file first
    const exactPath = path.join(__dirname, cleanPath);
    
    // If the exact file doesn't exist and the path doesn't end in .html,
    // try adding .html
    const htmlPath = cleanPath.endsWith('.html') ? 
        exactPath : 
        path.join(__dirname, cleanPath + '.html');
    
    // If neither exists, serve index.html
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
