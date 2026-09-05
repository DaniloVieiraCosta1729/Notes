const {createServer, request} = require('node:http');
const {join} = require('path');
const {createReadStream} = require('fs');
const { writeFile } = require('node:fs/promises');

async function savaHTML(request, path)
{
    let text = [];

    await request.on('data', chunk => {text.push(chunk)}).on('end', () => text = Buffer.concat(text).toString());

    writeFile(path, text, 'utf8');
}

const root = join(__dirname, '../');
let currentNote = '';

function sendContent(response, request, url){

    let stream;
    let content;
    
    if (url === '/') {
        content = join(root, 'index.html');
        currentNote = content;
        stream = createReadStream(content);
        stream.pipe(response);
    } else if(url === '/save'){
        console.log(`${currentNote}`);
        savaHTML(request, currentNote);
    } else {
        content = join(root, `/${url}`);
        currentNote = content;
        console.log(`caderno atual: ${currentNote}`);
        stream = createReadStream(content);
        stream.pipe(response);
    }
}

const server = createServer(
    (request, response) => {
        const {url} = request;

        sendContent(response, request, url);
    }
);

server.listen(5000);