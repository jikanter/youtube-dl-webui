/* The Center Youtube Video downloader */
var http = require('http');
var spawn = require('child_process').spawn;
var parse = require('querystring').parse;
var emitter = require('events').EventEmitter;
var url = require('url');

http.createServer(function(request, response) { 
  
  var video = url.parse(request.url, true).query;
  if (video.url) { 
    console.log(video.url);
    var ytDownloader = spawn('/usr/local/bin/youtube-dl', ['-o', '/usr/local/var/videos/%(id)s.flv',
    '--exec', 'mv {} /usr/local/var/videos/youtube.flv',
    '-f', 'flv', video.url]);
    
    ytDownloader.on('close', function(code, signal) {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.write('<!DOCTYPE HTML>');
      response.write('<html>');
      response.write('<head>');
      response.write('<title>Center Youtube Downloader</title>');
      response.write('<style type="text/css">');
      response.write('* {padding: 0; margin: 0 }');
      response.write('form, label, a { vertical-align: center; }');
      response.write('input[type="text"] { -webkit-appearance: text-field; width: 60%; height: 30%; margin: 0 0 2% 0; }');
      response.write('input[type="submit"] { margin: 0 0 0 12%; padding: 2%; width: 20%; }');
      response.write('.content { margin-left: 23%; margin-top: 20%; }');
      response.write('</style>');
      response.write('</head>');
      response.write('<body>');
      response.write('<div class="content">');
      response.write('<label for="get-url">Paste YouTube &copy; url in the field below to download the video</label>');
      response.write('<form id="get-url" action="/" method="GET">');
      response.write('<section>');
      response.write('<input type="text" name="url" />');
      response.write('</section>');
      response.write('<section>');
      response.write('<input type="submit" value="Get Video"/>');
      response.write('</section>');
      response.write('</div>');
      response.write('</form>');
      response.write("<a href='youtube.flv'>Download Video</a> <p>Directions: Right-Click &quot;Download Video&quot;, Then click Save-As to save the video to your desktop</p>");
      response.write('</body>');
      response.write('</html>');
      response.end();
    });
  } else { 
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.write('<!DOCTYPE HTML>');
      response.write('<html>');
      response.write('<head>');
      response.write('<title>Center Youtube Downloader</title>');
      response.write('<style type="text/css">');
      response.write('* {padding: 0; margin: 0 }');
      response.write('form, label, a { vertical-align: center; }');
      response.write('input[type="text"] { -webkit-appearance: text-field; width: 60%; height: 30%; margin: 0 0 2% 0; }');
      response.write('input[type="submit"] { margin: 0 0 0 12%; padding: 2%; width: 20%; }');
      response.write('.content { margin-left: 23%; margin-top: 20%; }');
      response.write('</style>');
      response.write('</head>');
      response.write('<body>');
      response.write('<div class="content">');
      response.write('<label for="get-url">Paste YouTube &copy; url in the field below to download the video</label>');
      response.write('<form id="get-url" action="/" method="GET">');
      response.write('<section>');
      response.write('<input type="text" name="url" />');
      response.write('</section>');
      response.write('<section>');
      response.write('<input type="submit" value="Get Video"/>');
      response.write('</section>');
      response.write('</div>');
      response.write('</form>');
      //response.write("<a href='http://localhost:9001/youtube.flv'>Download Video</a>");
      response.write('</body>')
      response.write('</html>');
      response.end();
    }
  
}).listen(8125);