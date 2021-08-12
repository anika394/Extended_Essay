var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

var input = [
  {
    type: 'input',
    request_quantity: 1,
    request_type,
  }
]

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.route('/Node').get(function(req,res)
{
    res.send("Tutorial on Node");
});

app.listen(8081)