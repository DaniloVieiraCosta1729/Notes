const {createServer} = require('node:http');
const {join} = require('path');
const {createReadStream} = require('fs');

const root = join(__dirname, '../');

function sendContent(response, url){

    let content;
    let stream;
    
    if (url === '/') {
        content = join(root, 'index.html');
        stream = createReadStream(content);
        stream.pipe(response);
    } else {
        content = join(root, `/${url}`);
        stream = createReadStream(content);
        stream.pipe(response);
    }
}

const server = createServer(
    (request, response) => {
        const {url} = request;

        sendContent(response, url);
    }
);

server.listen(5000);