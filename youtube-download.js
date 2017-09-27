/* The Center Youtube Video downloader */
var http = require('http');
var spawn = require('child_process').spawn;
var parse = require('querystring').parse;
var emitter = require('events').EventEmitter;
var url = require('url');

var config = {
  pythonVersion: [2,7,9],
  staticHost: "localhost",
  // if you want to keep the extracted files on the server in temporary directory 
  // in the format <artist>-<song>-<id>.<format>, change this to true
  storeExtractedFile: true,
}


http.createServer(function(request, response) { 
  
  var video = url.parse(request.url, true).query;
  var pythonVersion = config['pythonVersion'];
  var staticHost = config['staticHost'];
  // if we are storing extracted files, copy the resource, don't move it 
  var resourceGenerationCommand = config['storeExtractedFile'] ? 'cp' : 'mv';

  //  see https://github.com/rg3/youtube-dl/issues/4896
  var checkSslCertificateP = ((pythonVersion[0] > 3) || ((pythonVersion[0] == 2) && (pythonVersion[2] < 9)));
  if (video.url) { 
    var extractAudio = video['extract-audio'];
    //if (extractAudio) { console.log("Extracting Audio"); }
    console.log(video.url);

    // if we are extracting audio, create the audio extraction parameter list
    var audioParams = extractAudio ? ["--extract-audio", "--audio-format", "m4a"] : [];
    var fileSuffix = extractAudio ? 'm4a' : 'mp4';
    resourceGenerationCommand = resourceGenerationCommand + ' {} /Volumes/FRANKLIN/Music/youtube.' + fileSuffix;

    console.log(resourceGenerationCommand);
    // the downloader command

    var ytDownloader = spawn('/usr/local/bin/youtube-dl', ['-o', '/Volumes/FRANKLIN/Music/%(title)s-%(id)s.' + fileSuffix,
    // --no-progress is basically a no-op, because we need something else here for old
    // versions of python because for some reason node barfs on an empty string in the arguments list
    checkSslCertificateP ? "--no-progress" : "--no-check-certificate",
    '--exec', resourceGenerationCommand,
    //'--verbose',
    // extractAudio flag
    '-f', fileSuffix,
    video.url].concat(audioParams));
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
      response.write('<label for="extract-audio">Extract Audio?</label>');
      response.write('<input type="checkbox" name="extract-audio" value="Extract Audio">');
      response.write('<input type="submit" value="Get Video"/>');
      response.write('</section>');
      response.write('</div>');
      response.write('</form>');
      response.write("<a href='http://"+staticHost+":9001/youtube."+fileSuffix+"'>Download Video</a> <p>Directions: Right-Click &quot;Download Video&quot;, Then click Save-As to save the video to your desktop</p>");
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
      response.write('<label for="extract-audio">Extract Audio?</label>');
      response.write('<input type="checkbox" name="extract-audio" value="Extract Audio">');
      response.write('<input type="submit" value="Get Video"/>');
      response.write('</section>');
      response.write('</div>');
      response.write('</form>');
      //response.write("<a href='http://localhost:9001/youtube.mp4'>Download Video</a>");
      response.write('</body>')
      response.write('</html>');
      response.end();
    }
  
}).listen(8125);