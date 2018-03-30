// //引入http模块
// var http = require('http'),
// //创建一个服务器
// server = http.createServer(function(req, res) {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.write('hello world!');
//     res.end();
// });

var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request  = require('request');

var url = 'http://fgowiki.com/guide';
var file_url = './text/url.txt'

var isdownload = true;

function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            // console.log(chunk);
            data += chunk;
        });
        res.on('end', function() {
            callback(data);
        });
    }).on("error", function() {
        callback(null);
    })
}

function saveImg(title, url) {
    request.head(url, function(err, res, body){
        if(err) {
            console.log(err);
        }
        request(url).pipe(fs.createWriteStream('./images/'+title));
    });
}

// saveImg('baidu', 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png')

download(url, function(data) {
    if(data && isdownload) {
        console.log(data);
        // 这里处理数据
        var $ = cheerio.load(data);
        var temp_array = [];
        var temp_url = '';
        console.log($('#DataList .lazy').length)
        $('#DataList .lazy').each(function(){
            var _url = $(this).attr('src');
            console.log('_url: ' , _url)
            temp_array = temp_url.split('/');
            saveImg(temp_array[temp_array.length-1], _url);
        })
    }else{
        console.log('error');
    }
})


app.use('/', express.static(__dirname+'/public'));

var json = { 
    list: [
        { id: 1, text: 'test'}
    ]
 }
app.get('/test', function(req, res){
    res.status(200),
    res.json(json);
})

//监听8686端口
server.listen(8686);
console.log('server started');

