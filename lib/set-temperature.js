var axios = require('axios')
var URL = 'http://api-m2x.att.com/v2'
var PATH = '/devices/f816f8513a16d9bd7e38ae2ec87e6e77/updates'

var config = {
  headers: {
    'X-M2X-KEY': '1bf8cb40c9191cf44a296c6acc823903'
  }
}

var data = {
  'values': {}
}

function sendData (stream, value) {
  data.values[stream] = {
    'timestamp': new Date(),
    'value': value
  }

  axios.post(URL + PATH, data, config)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (response) {
      console.log(response)
    })
}

module.exports = sendData
