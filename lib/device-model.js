/* global THREE */

"use strict";

var Controller = require('node-pid-controller');

var K_P = 0.05;
var K_I = 5;
var K_D = 0.001;
var DT = 50;

var scene;
var camera;
var device;
var renderer;
var controller;

function build3DModel() {
  var container = document.getElementById('model');
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
  device.rotation.y = controller.update(device.rotation.y);
  renderer.render(scene, camera);
}

DeviceModel.prototype.setAngles = function(alpha, beta, gamma) {
  var a = toRad(alpha);

  controller.setTarget(a);
  //device.rotation.x = toRad(beta);
  //device.rotation.z = -toRad(gamma);
};

function DeviceModel() {
  controller = new Controller(K_P, K_I, K_D, DT / 1000);

  build3DModel();
  setInterval(render, DT);
}

module.exports = DeviceModel;
