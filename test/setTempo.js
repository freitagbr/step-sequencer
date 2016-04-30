'use strict';

var assert = require('assert');
var StepSequencer = require('../index');

describe('#setTempo()', function () {
  it('should throw when tempo is not a number', function () {
    var stepSequencer = new StepSequencer();

    try {
      stepSequencer.setTempo('100');
    } catch (e) {
      return;
    }

    assert.fail();
  });

  it('should set the tempo correctly', function () {
    var stepSequencer = new StepSequencer();

    stepSequencer.setTempo(100);

    assert.equal(stepSequencer.tempo, 100);
    assert.equal(stepSequencer.timeout, '150000000n');
  });
});
