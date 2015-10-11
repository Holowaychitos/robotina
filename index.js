var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var _ = require('lodash')

var WEBPORT = 3000
var devices = require('./config/devices')
var PeriodicActivity = require('./lib/periodic-activity')

var btUpdater = new PeriodicActivity(devices['intput_1'], function (newValue) {
  io.emit('controlUpdate', {button: !!newValue})
})

function getRootCallback (req, res) {
  res.sendfile('index.html')
}

app.get('/', getRootCallback)

io.on('connection', function onConnection (socket) {
  console.log('Dentro')
  socket.on('controlHandler', function (data) {
    _.forEach(data, function (val, key) {
      console.log('Phone Action: ', val, key)
      devices[key].write(parseState(val))
    })

    io.emit('controlUpdate', data)
  })
})

function parseState (value) {
  return value ? 1 : 0
}

// var btState = false;
//
// function periodicActivity () {
//   var newState = button.read()
//   if (btState !== newState) {
//     btState = newState
//     console.log('Gpio is ' + btState)
//     io.emit('controlUpdate', {button: !!btState})
//   }
//   setTimeout(periodicActivity, 100)
// }

// Crea el servidor y define el puerto en el que escucha
http.listen(WEBPORT, function serverStart () {
  console.log('http:my-ip.com/', WEBPORT)
})
