var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var _ = require('lodash')

var WEBPORT = 3000
var devices = require('./config/devices')
var PeriodicActivity = require('./lib/periodic-activity')

var btUpdater = {
  a: new PeriodicActivity(devices['intput_1'], function (newValue) {
    io.emit('controlUpdate', {intput_1: !!newValue})
  }),
  b: new PeriodicActivity(devices['intput_2'], function (newValue) {
    io.emit('controlUpdate', {intput_2: !!newValue})
  }),
  c: new PeriodicActivity(devices['intput_3'], function (newValue) {
    io.emit('controlUpdate', {intput_3: !!newValue})
  })
}

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

http.listen(WEBPORT, function serverStart () {
  console.log('http:my-ip.com/', WEBPORT)
})
