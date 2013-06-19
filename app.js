var express = require('express'); // the express framework

var cons = require('consolidate'); // swig dependency
var swig = require('swig'); // template engine

var app = express(); // start the framework!

// start the template engine
app.engine('.html', cons.swig);
app.set('view engine', 'html');
swig.init({
  root: __dirname + '/views',
  allowErrors: true
});
app.set('views', __dirname + '/views');

app.use(express.bodyParser()); // for parsing the POST array
app.use(express.static(__dirname + '/static')); // serve static files
app.use(app.router); // switch on routing

// our homepage route
app.get('/', function (req, res) {
  res.render('index.html', {});
});

// last bit - listen
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
