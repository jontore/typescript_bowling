var Frame = require("../lib/frame").default;

describe("Frame", function () {
  var frame;
  beforeEach(function() {
    frame = new Frame();
  });
  describe('#addRoll', function() {
    it('should add the roll to the frame', function() {
      frame.addRoll(8);
      expect(frame.rolls[0]).toEqual(8);
    });
  });
  describe('#calculateScore', function() {
    it('should return the the sum of the scores', function() {
        frame.addRoll(7);
        frame.addRoll(2);
        expect(frame.calculateScore()).toEqual([2, 9]);
    });

    it('should return spare type if sum is 10 with more than one roll', function() {
        frame.addRoll(8);
        frame.addRoll(2);
        expect(frame.calculateScore()).toEqual([0, 10]);
    });

    it('should return stryke type if sum is 10 on one roll', function() {
        frame.addRoll(10);
        expect(frame.calculateScore()).toEqual([1, 10]);
    });
  });
});
