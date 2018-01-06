var express = require('express');
var app = express();
var raspberryPiRoutes = require('./routes/raspberryPiRoutes');

var num = 0;
app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var method = req.method;
    var url = req.url;

    console.log((++num) + ". IP " + ip + " " + method + " " + url);
    next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api', raspberryPiRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
