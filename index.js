'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var NanoTimer = require('nanotimer');

function loop() {
  var self = this;
  self.timer.setTimeout(function () {
    self._advance.call(self);
    if (self._playing) loop.call(self);
  }, '', self.timeout);
}

function StepSequencer(tempo, division, sequence) {
  this.tempo = tempo || 120;
  this.division = division || 4;
  this.sequence = sequence || [];
  this.step = 0;
  this.timer = new NanoTimer();
  this.timeout = Math.floor((60 / (tempo * division)) * 10e8) + 'n';
  this._playing = false;
  EventEmitter.call(this);
}

inherits(StepSequencer, EventEmitter);

StepSequencer.prototype._advance = function () {
  this.emit('' + this.step, this.sequence[this.step]);
  this.step = (this.step + 1);
  if (this.step === this.sequence.length) this.step = 0;
}

StepSequencer.prototype.play = function () {
  if (this._playing) return;
  this.step = 0;
  this._playing = true;
  loop.call(this);
};

StepSequencer.prototype.resume = function () {
  if (this._playing) return;
  this._playing = true;
  loop.call(this);
};

StepSequencer.prototype.stop = function () {
  if (!this._playing) return;
  this._playing = false;
};

module.exports = StepSequencer;
