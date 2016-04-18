# step-sequencer

An EventEmitter-based step-sequencer for Node.js.

# Usage
```javascript
var StepSequencer = require('step-sequencer');

// Instantiate a new StepSequencer object
var stepSequencer = new StepSequencer(120, 4, [0, 1, 2, 3]);

// The StepSequencer emits the number of
// the step when that step is to be played
stepSequencer.on('0', function (step) {
    console.log(step);
})
.on('1', function (step) {
    console.log(step);
})
.on('2', function (step) {
    console.log(step);
})
.on('3', function (step) {
    console.log(step);
});

// Begin playing the sequence
stepSequencer.play();
// 0
// 1
// 2
// 3 ...
```

# Methods

## StepSequencer.prototype.play

Begins playing the sequence:
```javascript
stepSequencer.play();
// 0
// 1
// 2
// 3 ...
```

## StepSequencer.prototype.stop

Stops playing the sequence, does not reset the current step:
```javascript
// 0
// 1
stepSequencer.stop();
```

## StepSequencer.prototype.resume

Resumes playing from the current step. Continued from the previous example:
```javascript
stepSequencer.resume();
// 2
// 3 ...
```

# License

MIT
