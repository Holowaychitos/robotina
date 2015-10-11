var ioFactory = require('../lib/io-factory')

module.exports = {
  'output_1': ioFactory(13, 'OUT'),
  'output_2': ioFactory(12, 'OUT'),
  'output_3': ioFactory(11, 'OUT'),
  'intput_1': ioFactory(5, 'IN'),
  'intput_2': ioFactory(6, 'IN'),
  'intput_3': ioFactory(7, 'IN')
}
