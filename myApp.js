var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  var method = req.method;
  var path = req.path;
  var ip = req.ip;
  console.log(`${method} ${path} - ::ffff:${ip}`);
  next();
}

app.use(bodyParser.urlencoded({extended: false}));

app.use(myLogger);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
    
const mySecret = process.env['MESSAGE_STYLE'];
const response = {"message" : "Hello json"};

  if(mySecret === 'uppercase') {
    response.message = response.message.toUpperCase();
  }

  res.json(response);
});

app.get('/now', 
    function(req, res, next) {
      req.time = new Date().toString();
      next();
    },
    function(req, res){
      res.json({"time": req.time});
    }
);

app.get('/:word/echo', (req, res) => {
  res.json({"echo" : req.params.word});
});


/*app.get('/name', (req, res) => {
  res.json({"name": `${req.query.first} ${req.query.last}`});
});*/

app.route('/name')
  .get((req, res) => {
    res.json({"name": `${req.query.first} ${req.query.last}`});
  })
  .post((req, res) => {
    //console.log(req.body);
    res.json({"name": `${req.body.first} ${req.body.last}`});
  });






































 module.exports = app;
