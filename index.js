var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var WEBPORT = 3000 // Puerto en el que escucha el servidor web

var mraa = require('mraa')
console.log('MRAA Version: ' + mraa.getVersion())
var pin13 = new mraa.Gpio(13)
pin13.dir(mraa.DIR_OUT)

var objControl = {'led': pin13}
function getRootCallback (req, res) {
  res.sendfile('index.html')
}

// GET /: Crea la ruta '/' y lanza un callback
app.get('/', getRootCallback)

io.on('connection', function onConnection (socket) {
  console.log('Dentro')
  socket.on('controlHandler', function (data) {
    console.log('Data:', data)
    objControl[data.control].write(parseState(data.value))
    io.emit('controlUpdate', data)
  })
})

function parseState (value) {
  return value ? 1 : 0
}

// Crea el servidor y define el puerto en el que escucha
http.listen(WEBPORT, function serverStart () {
  console.log('http:my-ip.com/', WEBPORT)
})
