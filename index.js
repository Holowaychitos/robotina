var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var _ = require('lodash')

var WEBPORT = 3000 // Puerto en el que escucha el servidor web

var mraa = require('mraa')
console.log('MRAA Version: ' + mraa.getVersion())
var pin13 = new mraa.Gpio(13)
pin13.dir(mraa.DIR_OUT)

var button = new mraa.Gpio(12);
button.dir(mraa.DIR_IN)

var objControl = {'led': pin13}

function getRootCallback (req, res) {
  res.sendfile('index.html')
}

// GET /: Crea la ruta '/' y lanza un callback
app.get('/', getRootCallback)

io.on('connection', function onConnection (socket) {
  periodicActivity()
  console.log('Dentro')
  socket.on('controlHandler', function (data) {
    _.forEach(data, function(val, key){
      console.log(val, key)
      objControl[key].write( parseState(val))
    })    

    io.emit('controlUpdate', data)
  })
})

function parseState(value) {
  return value ? 1 : 0
}

var btState = false;

function periodicActivity () {
  var newState = button.read()
  if (btState !== newState) {
    btState = newState
    console.log('Gpio is ' + btState)
    io.emit('controlUpdate', {button: !!btState})
  }
  setTimeout(periodicActivity, 100)
}

// Crea el servidor y define el puerto en el que escucha
http.listen(WEBPORT, function serverStart () {
  console.log(WEBPORT)
})

