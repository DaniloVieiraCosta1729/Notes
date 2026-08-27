// I'm don't use JS very often, so I'll commenting the things I've learned while I write this.
// To take only a single function from node, I can use destructuring.
const {createServer} = require('node:http'); // I could make const http = require('node:http'); but the destructuring, like I said, allows me to take only the createServer function.
const {join} = require('path');
const {createReadStream} = require('fs');

const host = '127.0.0.1';
const port = 5000;

const server = createServer(

    (req, res) => {
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'audio/mpeg');

        const sound = join(__dirname,"../static/audio/hallo_worldoo.mp3");

        const stream = createReadStream(sound);
        stream.pipe(res);
    }

);

server.listen(port, host, () => {console.log(`listen on ${host}:${port}`)})