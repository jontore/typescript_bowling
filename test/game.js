var Game = require('../lib/game').default;
var Frame = require('../lib/frame').default;

describe("Game", function () {
  var game;
  beforeEach(function() {
    game = new Game();
  });
  describe('on contsruction', function() {
    it('should have 10 frames', function() {
      expect(game.frames.length).toBe(10);
      expect(game.frames[0] instanceof Frame).toBe(true);
    });
  });
  describe('#nextFrame', function() {

    it('should return the next Frame', function() {
      expect(game.nextFrame() instanceof Frame).toBe(true);
    });

    it('should not return the same Frame as the last Frame', function() {
      var firstFrame = game.nextFrame();
      var nextFrame = game.nextFrame();
      expect(firstFrame).not.toBe(nextFrame);
    });

  });

  describe('#isComplete', function() {
    it('should be false if there it is not on the last frame', () => {
      var firstFrame = game.nextFrame();
      expect(game.isComplete()).toBe(false);
    });

    it('should be true if it is on the last frame and it has completed', () => {
      game.currentFrameIndex = 9;
      game.frames[9].isComplete = function() { return true; }
      expect(game.isComplete()).toBe(true);
    })
  });

  describe('#calculateScore', function() {
    describe('when there are no strikes or spares', function() {
      it('the scores should be the sum of all the frames', function() {
        game.frames[0].addRoll(6);
        game.frames[0].addRoll(2);
        game.frames[1].addRoll(3);
        game.frames[1].addRoll(2);

        expect(game.calculateScore()).toBe(8 + 5);
      });

      it('should calculate the sum of all 10 frames', function() {
        game.frames.forEach(function(frame) {
          frame.addRoll(2);
        });

        expect(game.calculateScore()).toBe(20);
      });
    });
  });
  describe('when there is a strike', function() {
      it('if two strikes follows the first strike it should add the two strikes to the first', function() {
        game.frames[0].addRoll(10);
        game.frames[1].addRoll(10);
        game.frames[2].addRoll(10);

        expect(game.calculateScore()).toBe((30 + 20 + 10));
      });

      it('should add the subsequent non two roll strike/spare frame to the last strike frame', function() {
        game.frames[0].addRoll(10);
        game.frames[1].addRoll(5);
        game.frames[1].addRoll(4);

        expect(game.calculateScore()).toBe((19 + 9));
      });

      it('should add the subsequent last strike frame spare as 10 ', function() {
        game.frames[0].addRoll(10);
        game.frames[1].addRoll(4);
        game.frames[1].addRoll(4);

        expect(game.calculateScore()).toBe(26);
      });

      it('should add the next two roll', function() {
        game.frames[0].addRoll(10);
        game.frames[1].addRoll(2);
        game.frames[1].addRoll(2);

        expect(game.calculateScore()).toBe(18);
      });

      it('should add the next two even though the they are strikes in differnt frames', function() {
        game.frames[0].addRoll(10);
        game.frames[1].addRoll(10);
        game.frames[2].addRoll(10);
        game.frames[3].addRoll(2);
        game.frames[3].addRoll(2);

        expect(game.calculateScore()).toBe(70);
      });
  });

  describe('when there is a spare', function() {
    it('should add the next roll', function() {
      game.frames[0].addRoll(5);
      game.frames[0].addRoll(5);
      game.frames[1].addRoll(4);
      game.frames[1].addRoll(2);

      expect(game.calculateScore()).toBe(20);
    });

    it('should add the next roll if it is strike', function() {
      game.frames[0].addRoll(5);
      game.frames[0].addRoll(5);
      game.frames[1].addRoll(10);

      expect(game.calculateScore()).toBe(30);
    });
  });

  describe('the perfect game', function() {
    it('should have a sum of 300 with only strikes', () => {
      while(!game.isComplete()) {
          var frame = game.getCurrentFrame();
          while(!frame.isComplete()) {
            frame.addRoll(10);
          }
          game.nextFrame();
      }

      expect(game.calculateScore()).toBe(300);
    });
  });
});
