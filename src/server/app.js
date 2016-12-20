var http = require('http');

var server = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.end('okay');
});

//start the server
server.listen(2345, function () {

    console.log("Server listening on: http://localhost:%s", 2345);
});