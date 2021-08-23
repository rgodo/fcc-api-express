var express = require('express');
var app = express();

//console.log('Hello world');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
  res.json({"message" : "Hello json"});
});






































 module.exports = app;
