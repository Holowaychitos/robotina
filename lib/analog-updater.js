var mraa = require('mraa')
var AnalogUpdater = function (analogPin, callback) {
  this.analogInput = new mraa.Aio(analogPin)
  this.value = 0
}

AnalogUpdater.prototype._updater = function () {
  var newValue = this.analogInput.read()
  if (this.value !== newValue) {
    this.value = newValue
    this.callback && this.callback(newValue)
  }
  setTimeout(this._updater.bind(this, this.callback), 100)
}

module.exports = AnalogUpdater
