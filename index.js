'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var NanoTimer = require('nanotimer');

function StepSequencer(tempo, division, sequence) {
  var self = this;
  var timer = new NanoTimer();
  var timeout = Math.floor((60 / (tempo * division)) * 10e5) + 'u';

  self.tempo = tempo;
  self.division = division;
  self.sequence = sequence;
  self.step = 0;

  function advance() {
    self.emit('' + self.step, self.sequence[self.step]);
    self.step = (self.step + 1) ;
    if (self.step === self.sequence.length) self.step = 0;
  }

  self.play = function () {
    self.step = 0;
    timer.setInterval(advance, '', timeout);
  };

  self.resume = function () {
    timer.setInterval(advance, '', timeout);
  };

  self.stop = function () {
    timer.clearInterval();
  };

  EventEmitter.call(self);
}

inherits(StepSequencer, EventEmitter);
module.exports = StepSequencer;
