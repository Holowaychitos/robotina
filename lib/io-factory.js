var mraa = require('mraa')
console.log('MRAA Version: ' + mraa.getVersion())

function ioFactory (PIN, DIR) {
  var inst = new mraa.Gpio(PIN)
  inst.dir(mraa['DIR_' + DIR])
  return inst
}

module.exports = ioFactory
