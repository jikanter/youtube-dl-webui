var express = require('express');
var app = express();

app.use('/', express.static('/Volumes/FRANKLIN/Music'));

var server = app.listen(process.env.PORT || 9001, function() { 
  console.log('Listening on port %d', server.address().port);
});