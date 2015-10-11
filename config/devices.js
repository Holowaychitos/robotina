var mraa = require('mraa')

module.exports = {
  output_1: (new mraa.Gpio(13)).dir(mraa.DIR_OUT),
  intput_1: new mraa.Gpio(12)
}
