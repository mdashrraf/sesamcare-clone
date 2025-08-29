const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static('.'));

// Proxy all static assets (CSS, JS, fonts) to sesamecare.com
app.use('/ui-kit', createProxyMiddleware({
    target: 'https://cdn.sesamecare.com',
    changeOrigin: true,
    pathRewrite: {
        '^/ui-kit': '/ui-kit'
    }
}));

app.use('/_next', createProxyMiddleware({
    target: 'https://cdn.sesamecare.com/746c07b10a8873d2282f95696a702c80',
    changeOrigin: true
}));

// Proxy API calls to sesamecare.com
app.use('/api', createProxyMiddleware({
    target: 'https://api.sesamecare.com',
    changeOrigin: true
}));

app.use('/graphql', createProxyMiddleware({
    target: 'https://api.sesamecare.com',
    changeOrigin: true
}));

// For dynamic content like telehealth doctors
app.use('/doctors', createProxyMiddleware({
    target: 'https://doctors.sesamecare.com',
    changeOrigin: true
}));

// For any HTML requests, serve the local files if they exist
app.use('*', (req, res, next) => {
    const cleanPath = req.path.split('?')[0].split('#')[0];
    let filePath = path.join(__dirname, cleanPath);

    // Add .html extension if not present
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    // Try to serve the exact file first
    try {
        if (require('fs').existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            // If file doesn't exist locally, proxy to sesamecare.com
            createProxyMiddleware({
                target: 'https://sesamecare.com',
                changeOrigin: true
            })(req, res, next);
        }
    } catch (err) {
        next(err);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
