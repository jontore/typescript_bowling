var Frame = require("../lib/frame").default;

describe("Frame", function () {
  var frame;
  beforeEach(function() {
    frame = new Frame(false);
  });
  describe('#addRoll', function() {
    it('should add the roll to the frame', function() {
      frame.addRoll(8);
      expect(frame.rolls[0]).toEqual(8);
    });
  });

  describe('#isComplete', function() {
    describe('normal frame', function() {
      it('should return true if has two rolls', function() {
        frame.addRoll(2);
        frame.addRoll(3);
        expect(frame.isComplete()).toBe(true);
      });

      it('should return true if has one strike rolls', function() {
        frame.addRoll(10);
        expect(frame.isComplete()).toBe(true);
      });

      it('should return false if has less than two rolls', function() {
        frame.addRoll(2);
        expect(frame.isComplete()).toBe(false);
      });
    });

    describe('the last frame', function() {
      beforeEach(function() {
        frame = new Frame(true);
      });

      it('should return true if has two rolls and there is no strike/spare', function() {
        frame.addRoll(2);
        frame.addRoll(3);
        expect(frame.isComplete()).toBe(true);
      });

      it('should return false if has two rolls but there is a strike/spare', function() {
        frame.addRoll(2);
        frame.addRoll(8);
        expect(frame.isComplete()).toBe(false);
      });

      it('should return true if there is three rolls and there is a strike/spare', function() {
        frame.addRoll(2);
        frame.addRoll(10);
        frame.addRoll(10);
        expect(frame.isComplete()).toBe(true);
      });

      it('should return false if there is tow rolls and they are both strikes', function() {
        frame.addRoll(10);
        frame.addRoll(10);
        expect(frame.isComplete()).toBe(false);
      });

      it('should return false if has less than two rolls', function() {
        frame.addRoll(2);
        expect(frame.isComplete()).toBe(false);
      });
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

    it('should return strike type if sum is 10 on one roll', function() {
        frame.addRoll(10);
        expect(frame.calculateScore()).toEqual([1, 10]);
    });

    it('should return strike type if it is the last frame and has multiple strikes', function() {
        frame.addRoll(10);
        frame.addRoll(10);
        expect(frame.calculateScore()).toEqual([1, 20]);
    });
  });
});
