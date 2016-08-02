Controller.prototype.update = function() {
  return this.target;
};

Controller.prototype.setTarget = function(value) {
  this.target = value;
};

function Controller() {
  this.target = 0;
}

module.exports = Controller;
