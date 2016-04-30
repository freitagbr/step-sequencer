'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var NanoTimer = require('nanotimer');

function play() {
  if (this._playing) return;
  this.step = 0;
  this._playing = true;
  loop.call(this);
}

function loop() {
  var self = this;
  self.timer.setTimeout(function () {
    advance.call(self);
    if (self._playing) loop.call(self);
  }, '', self.timeout);
}

function advance() {
  this.emit('' + this.step, this.sequence[this.step]);
  this.step = (this.step + 1);
  if (this.step === this.sequence.length) this.step = 0;
}

function resume() {
  if (this._playing) return;
  this._playing = true;
  loop.call(this);
}

function stop() {
  if (!this._playing) return;
  this._playing = false;
  this.timer.clearTimeout();
}

function setTempo(tempo) {
  if (typeof tempo !== 'number') throw new TypeError('Tempo must be a number');
  this.tempo = tempo;
  this.timeout = Math.floor((60 / (this.tempo * this.division)) * 10e8) + 'n';
}

function setSequence(division, sequence) {
  if (typeof division !== 'number') throw new TypeError('Division must be a number');
  if (!(sequence instanceof Array)) throw new TypeError('Sequence must be an array');

  this.division = division;
  this.sequence = sequence;
  this.timeout = Math.floor((60 / (this.tempo * this.division)) * 10e8) + 'n';
}

function StepSequencer(tempo, division, sequence) {
  if (tempo && typeof tempo !== 'number') throw new TypeError('Tempo must be a number');
  if (division && typeof division !== 'number') throw new TypeError('Division must be a number');
  if (sequence && !(sequence instanceof Array)) throw new TypeError('Sequence must be an array');

  this.tempo = tempo || 120;
  this.division = division || 4;
  this.sequence = sequence || [];
  this.step = 0;
  this.timer = new NanoTimer();
  this.timeout = Math.floor((60 / (this.tempo * this.division)) * 10e8) + 'n';
  this._playing = false;
  EventEmitter.call(this);
}

inherits(StepSequencer, EventEmitter);

StepSequencer.prototype.play = play;
StepSequencer.prototype.resume = resume;
StepSequencer.prototype.stop = stop;
StepSequencer.prototype.setTempo = setTempo;
StepSequencer.prototype.setSequence = setSequence;

module.exports = StepSequencer;
