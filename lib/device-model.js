/* global THREE */

"use strict";

var Controller = require('node-pid-controller');
// var Controller = require('./controller');

var K_P = 0.05;
var K_I = 5;
var K_D = 0.001;
var DEFAULT_DT = 50;
var DEFAULT_ID = 'model';

var scene;
var camera;
var device;
var renderer;
var alphaController;
var betaController;
var gammaController;

function build3DModel(ID) {
  var container = document.getElementById(ID);
  var width = container.offsetWidth;

  camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
  camera.position.y = 150;
  camera.position.z = 500;

  var geometry = new THREE.BoxGeometry(200, 200, 200);
  for (var i = 0; i < geometry.faces.length; i += 2) {
    var color = Math.random() * 0xffffff;
    geometry.faces[i].color.setHex(color);
    geometry.faces[i + 1].color.setHex(color);
  }

  var material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    overdraw: 0.5
  });

  device = new THREE.Mesh(geometry, material);
  device.position.y = 200;

  scene = new THREE.Scene();
  scene.add(device);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xf0f0f0);
  renderer.setSize(width, width);
  container.appendChild(renderer.domElement);
}

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

function render() {
  var x = device.rotation.x;
  var y = device.rotation.y;
  var z = device.rotation.z;

  device.rotation.x = 0;
  device.rotation.y = 0;
  device.rotation.z = 0;

  device.rotateY(gammaController.update(y));
  device.rotateX(betaController.update(x));
  device.rotateZ(alphaController.update(z));

  renderer.render(scene, camera);
}

DeviceModel.prototype.getAxisAngles = function() {
  return {
    x: device.rotation.x,
    y: device.rotation.y,
    z: device.rotation.z
  };
};

DeviceModel.prototype.setEulerAngles = function(alpha, beta, gamma) {
  alphaController.setTarget(toRad(alpha));
  betaController.setTarget(toRad(beta));
  gammaController.setTarget(toRad(gamma));
};

function DeviceModel(id, dt) {
  var ID = id || DEFAULT_ID;
  var DT = dt || DEFAULT_DT;

  alphaController = new Controller(K_P, K_I, K_D, DT / 1000);
  betaController = new Controller(K_P, K_I, K_D, DT / 1000);
  gammaController = new Controller(K_P, K_I, K_D, DT / 1000);

  build3DModel(ID);
  setInterval(render, DT);
}

module.exports = DeviceModel;
