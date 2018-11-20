const express = require('express')
const app = express()
const port = 3003
var formidable = require('formidable');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/read-file', (request, response) => {
    var fs = require('fs'),
        path = require('path'),    
        filePath = path.join(__dirname, 'README.md');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        } else {
            console.log(err);
        }
    });
});

app.get('/product', (request, response) => {
    console.log('received data: ' + JSON.stringify(request.query));
    const product = (request.query.num1*request.query.num2).toString();
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(product);
    response.end();
});

app.get('/non-repeat-char', (request, response) => {
    console.log('received data: ' + JSON.stringify(request.query));
    const str = request.query.str;
    var arr = str.split('');
    var result = '';
    var ctr = 0; 
    for (var x = 0; x < arr.length; x++) {
        ctr = 0;
        for (var y = 0; y < arr.length; y++) {
            if (arr[x] === arr[y]) {
                ctr+= 1;
            }
        }
        if (ctr < 2) {
            result = arr[x];
            break;
        }
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(result);
    response.end();
});

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/file-upload', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});
