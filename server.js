const http = require('http');
const {
    handleApi,
    handleHandles,
    getUserInfo
} = require('./controllers');

const server = http.createServer((req, res) => {

    if (req.url === '/api' && req.method === 'GET') handleApi(req, res);
    if (req.url === '/handles' && req.method === 'GET') handleHandles(req, res);
    if (/^\/api\/users\/:[\S]+/.test(req.url) && req.method === 'GET') getUserInfo(req, res);

});

server.listen(8080);
console.log('server is listening on port 8080');