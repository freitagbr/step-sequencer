'use strict';

var assert = require('assert');
var StepSequencer = require('../index');

describe('#setSequence()', function () {
  it('should throw when division is not a number', function () {
    var stepSequencer = new StepSequencer();

    try {
      stepSequencer.setSequence('2');
    } catch (e) {
      return;
    }

    assert.fail();
  });

  it('should throw when sequence is not an array', function () {
    var stepSequencer = new StepSequencer();

    try {
      stepSequencer.setSequence(2, {});
    } catch (e) {
      return;
    }

    assert.fail();
  });

  it('should set the division and sequence correctly', function () {
    var stepSequencer = new StepSequencer();

    stepSequencer.setSequence(2, [0, 1]);

    assert.equal(stepSequencer.division, 2);
    assert.equal(stepSequencer.sequence.length, 2);
    assert.equal(stepSequencer.sequence[0], 0);
    assert.equal(stepSequencer.sequence[1], 1);
    assert.equal(stepSequencer.timeout, '250000000n');
  });
});
