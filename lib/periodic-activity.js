// var mraa = require('mraa')
// console.log('MRAA Version: ' + mraa.getVersion())
//
// function periodicActivity (callback) {
//   var newState = button.read()
//   if (btState !== newState) {
//     btState = newState
//     callback && callback(newState)
//   }
//   setTimeout(periodicActivity, 100)
// }

var PeriodicActivity = function (input, callback) {
  this.input = input
  this.value = 0
  this.callback = callback
  this._updater()
}

PeriodicActivity.prototype._updater = function () {
  var newValue = this.input.read()
  if (this.value !== newValue) {
    this.value = newValue
    this.callback && this.callback(newValue)
  }
  setTimeout(this._updater.bind(this, this.callback), 100)
}

PeriodicActivity.prototype.setValue = function (value) {}

module.exports = PeriodicActivity
