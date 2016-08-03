"use strict";

var DeviceModel = require('device-model');
var Slider = require('bootstrap-slider');

(function() {
  var model = new DeviceModel();
  var updateSlider = new Slider('#updateSlider', {
    min: 10,
    max: 1000,
    step: 10,
    value: 200,
    tooltip: 'hide'
  });
  var alphaSlider = new Slider('#alphaSlider', {
    min: 0,
    max: 360,
    step: 1,
    tooltip: 'hide'
  });
  var betaSlider = new Slider('#betaSlider', {
    min: -180,
    max: 180,
    value: 0,
    step: 1,
    tooltip: 'hide'
  });
  var gammaSlider = new Slider('#gammaSlider', {
    min: -90,
    max: 90,
    value: 0,
    step: 1,
    tooltip: 'hide'
  });
  var xLabel = document.getElementById('x');
  var yLabel = document.getElementById('y');
  var zLabel = document.getElementById('z');

  function rotate() {
    model.setEulerAngles(alphaSlider.getValue() % 360,
                         betaSlider.getValue(),
                         gammaSlider.getValue());

    var axis = model.getAxisAngles();
    var x = axis.x.toFixed(2);
    var y = axis.y.toFixed(2);
    var z = axis.z.toFixed(2);

    xLabel.innerText = x;
    yLabel.innerText = y;
    zLabel.innerText = z;
  }

  var updateFreq = setInterval(rotate, 200);

  updateSlider.on('slide', function(value) {
    if (updateFreq) {
      clearInterval(updateFreq);
    }

    var freq = updateSlider.getValue();

    updateFreq = setInterval(rotate, freq);
    document.getElementById('freq').innerText = 'Update every ' + freq + ' ms';
  });

  xLabel.addEventListener('click', function() {
    betaSlider.setValue(0);
  });
  yLabel.addEventListener('click', function() {
    gammaSlider.setValue(0);
  });
  zLabel.addEventListener('click', function() {
    alphaSlider.setValue(0);
  });
})();
