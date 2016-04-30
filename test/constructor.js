'use strict';

var assert = require('assert');
var StepSequencer = require('../index');

describe('StepSequencer constructor', function () {
  it('should throw when tempo is not a number', function () {
    try {
      var stepSequencer = new StepSequencer('120');
      stepSequencer.play();
    } catch (e) {
      return;
    }

    assert.fail();
  });

  it('should throw when division is not a number', function () {
    try {
      var stepSequencer = new StepSequencer(120, '4');
      stepSequencer.play();
    } catch (e) {
      return;
    }

    assert.fail();
  });

  it('should throw when sequence is not an array', function () {
    try {
      var stepSequencer = new StepSequencer(120, 4, {});
      stepSequencer.play();
    } catch (e) {
      return;
    }

    assert.fail();
  });

  it('should use correct defaults', function () {
    var stepSequencer = new StepSequencer();

    assert.equal(stepSequencer.tempo, 120);
    assert.equal(stepSequencer.division, 4);
    assert.equal(stepSequencer.sequence.length, 0);
  });

  it('should construct properly', function () {
    var tempo = 160;
    var division = 2;
    var sequence = [0, 1];

    var stepSequencer = new StepSequencer(tempo, division, sequence);

    // properties
    assert.equal(stepSequencer.tempo, 160);
    assert.equal(stepSequencer.division, 2);
    assert.equal(stepSequencer.sequence.length, 2);
    assert.equal(stepSequencer.sequence[0], 0);
    assert.equal(stepSequencer.sequence[1], 1);
    assert.equal(stepSequencer.step, 0);
    assert.equal(typeof stepSequencer.timer, 'object');
    assert.equal(stepSequencer.timeout, '187500000n');
    assert.equal(stepSequencer._playing, false);

    // methods
    assert.equal(typeof stepSequencer.play, 'function');
    assert.equal(typeof stepSequencer.resume, 'function');
    assert.equal(typeof stepSequencer.stop, 'function');
    assert.equal(typeof stepSequencer.setTempo, 'function');
    assert.equal(typeof stepSequencer.setSequence, 'function');
    assert.equal(typeof stepSequencer.on, 'function');
    assert.equal(typeof stepSequencer.emit, 'function');
  });
});
