const {createServer} = require('node:http');
const {createReadStream} = require('fs');
const {join} = require('path');

const static = join(__dirname, '../');

const server = createServer(
    (request, response) => {
        const {headers, method, url} = request;
        console.log(url);
        request.on('error', () => {console.log('deu erro')});

        if (url === '/') {
            const page = join(static, 'index.html');
            const stream = createReadStream(page);
            stream.pipe(response); 
        } else {
            if (url[0] === '/.') {
                response.end('You little sneaky rat. Get away from my files!');
                return;
            } 

            const file = join(static, url);
            const stream = createReadStream(file);
            stream.pipe(response);
        }
        
    }
);

server.listen(5000);