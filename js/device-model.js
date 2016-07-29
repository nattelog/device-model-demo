/* global THREE, requestAnimationFrame */

function DeviceModel() {
  var scene;
  var camera;
  var device;
  var renderer;

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function toRad(degrees) {
    return degrees * Math.PI / 180;
  }

  this.rotate = function(a, b, g) {
    device.rotation.y = toRad(a);
    device.rotation.x = toRad(b);
    device.rotation.z = -toRad(g);
  };

  this.init = function() {
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

    render();
  };
}

module.exports = DeviceModel;
