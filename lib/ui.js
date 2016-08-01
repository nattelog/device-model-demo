var DeviceModel = require('./device-model');
var Slider = require('bootstrap-slider');
require('jquery')(window);

(function() {
  var model = new DeviceModel();
  var alphaSlider = new Slider('#alphaSlider', {
    min: 0,
    max: 360,
    step: 1,
    tooltip: 'hide'
  });
  var betaSlider = new Slider('#betaSlider', {
    min: 0,
    max: 360,
    step: 1,
    tooltip: 'hide'
  });
  var gammaSlider = new Slider('#gammaSlider', {
    min: 0,
    max: 360,
    step: 1,
    tooltip: 'hide'
  });
  var updateSlider = new Slider('#updateSlider', {
    min: 10,
    max: 1000,
    step: 10,
    value: 50,
    formatter: function(value) {
      return value + ' ms';
    }
  });

  function rotate() {
    model.rotate(alphaSlider.getValue(),
                 betaSlider.getValue(),
                 gammaSlider.getValue());
  }

  var updateFreq = setInterval(rotate, 50);

  updateSlider.on('slide', function(value) {
    if (updateFreq) {
      clearInterval(updateFreq);
    }
    updateFreq = setInterval(rotate, updateSlider.getValue());
  });

  model.init();
})();
