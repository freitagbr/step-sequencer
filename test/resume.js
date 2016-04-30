'use strict';

var assert = require('assert');
var StepSequencer = require('../index');

describe('#resume()', function () {
  var tempo = 10000;
  var division = 4;
  var sequence = [0, 1, 2, 3];

  it('should resume correctly', function (done) {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    stepSequencer.on('0', function () {
      stepSequencer.stop();

      setTimeout(function () {
        assert.equal(stepSequencer.step, 1);

        stepSequencer.resume();
      }, 1);
    })
    .on('1', function () {
      stepSequencer.stop();

      setTimeout(function () {
        assert.equal(stepSequencer.step, 2);

        stepSequencer.resume();
      }, 1);
    })
    .on('2', function () {
      stepSequencer.stop();

      setTimeout(function () {
        assert.equal(stepSequencer.step, 3);

        stepSequencer.resume();
      }, 1);
    })
    .on('3', function () {
      stepSequencer.stop();

      setTimeout(function () {
        assert.equal(stepSequencer.step, 0);

        done();
      }, 1);
    });

    stepSequencer.play();
  });

  it('should set the internal state correctly', function () {
    var stepSequencer = new StepSequencer(tempo, division, sequence);

    stepSequencer.play();
    stepSequencer.stop();
    stepSequencer.resume();

    assert(stepSequencer._playing);
  });
});
