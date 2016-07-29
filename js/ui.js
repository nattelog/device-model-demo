var DeviceModel = require('./device-model');
var Slider = require('bootstrap-slider');
var $ = require('jquery')(window);

(function() {
  var model = new DeviceModel();
  var slider = new Slider('#slider', {
    min: 0,
    max: 360,
    step: 1,
    tooltip: 'hide'
  });

  slider.on('slide', function() {
    model.rotate(slider.getValue(), 0, 0);
  });

  model.init();
})();
