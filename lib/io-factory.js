var mraa = require('mraa')
console.log('MRAA Version: ' + mraa.getVersion())

function ioFactory (PIN, DIR) {
  var inst = new mraa.Gpio(PIN)
  inst.dir(DIR === 'OUT' ? mraa.DIR_OUT : mraa.DIR_IN)
  return inst
}

module.exports = ioFactory
