const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const profile = {
            name: 'John Doe',
            age: 30,
            bio: 'Web Developer',
            image: 'https://storage.cloud.google.com/profil_ku/foto%20bangkit.PNG' // URL untuk gambar
        };
        res.end(JSON.stringify(profile));
    } else if (parsedUrl.pathname === '/image' && req.method === 'GET') {
        // Mengirim gambar
        fs.readFile('path/to/your/image.jpg', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Image not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});