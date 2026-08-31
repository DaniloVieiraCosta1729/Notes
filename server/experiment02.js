const http = require('node:http');

http.createServer(
    (rq, rp) => {
        let httpbody = [];

        rq.on('data', bytes => {httpbody.push(bytes)}).on('end', () => {
            httpbody = Buffer.concat(httpbody).toString(); 
            rp.writeHead(200, {'Content-Type': 'plain/text'});
            rp.end(httpbody);
            console.log(httpbody);
        });       
        
    }
).listen(5000);