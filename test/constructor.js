'use strict';

var assert = require('assert');
var StepSequencer = require('../index');

describe('object constructor', function () {

  it('should construct properly', function (done) {
    var tempo = 160;
    var division = 2;
    var sequence = [0, 1];

    var stepSequencer = new StepSequencer(tempo, division, sequence);

    assert(stepSequencer.tempo === 160);
    assert(stepSequencer.division === 2);
    assert(stepSequencer.sequence.length === 2);
    assert(stepSequencer.sequence[0] === 0);
    assert(stepSequencer.sequence[1] === 1);
    assert(stepSequencer.step === 0);
    assert(stepSequencer.timer);
    assert(typeof stepSequencer.timer === 'object');
    assert(stepSequencer.timeout === '187500000n');
    assert(stepSequencer._playing === false);

    assert(stepSequencer._advance);
    assert(typeof stepSequencer._advance === 'function');
    assert(stepSequencer.play);
    assert(typeof stepSequencer.play === 'function');
    assert(stepSequencer.resume);
    assert(typeof stepSequencer.resume === 'function');
    assert(stepSequencer.stop);
    assert(typeof stepSequencer.stop === 'function');
    assert(stepSequencer.on);
    assert(typeof stepSequencer.on === 'function');

    done();
  });

  it('should use correct defaults', function (done) {
    var stepSequencer = new StepSequencer();

    assert(stepSequencer.tempo === 120);
    assert(stepSequencer.division === 4);
    assert(stepSequencer.sequence.length === 0);

    done();
  });

});
