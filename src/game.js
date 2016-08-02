"use strict";
var frame_1 = require("./frame");
var Game = (function () {
    function Game() {
        this.frames = [];
        this.currentFrameIndex = 0;
        for (var i = 0; i < 10; i++) {
            this.frames.push(new frame_1.default());
        }
    }
    Game.prototype.nextFrame = function () {
        this.currentFrameIndex++;
        return this.frames[this.currentFrameIndex];
    };
    Game.prototype.calculateStrike = function (nextFrames) {
        var maxRolls = 3;
        var rolls = [10];
        for (var _i = 0, nextFrames_1 = nextFrames; _i < nextFrames_1.length; _i++) {
            var frame = nextFrames_1[_i];
            var numberOfRollLeft = maxRolls - rolls.length;
            var newRolls = frame.rolls.slice(0, (numberOfRollLeft + 1));
            console.log('-- left', numberOfRollLeft, newRolls);
            rolls = rolls.concat(newRolls);
        }
        ;
        console.log(rolls);
        return rolls.reduce(function (sum, roll) { return sum + roll; });
    };
    Game.prototype.calculateSpare = function (nextFrame) {
        var sum = 10;
        return sum += nextFrame.getFirstRoll();
    };
    Game.prototype.calculateScore = function () {
        var _this = this;
        var sum = this.frames.reduce(function (sum, frame, index) {
            var frameSum;
            var type;
            _a = frame.calculateScore(), type = _a[0], frameSum = _a[1];
            switch (type) {
                case 1:
                    var strikeSum = _this.calculateStrike(_this.frames.slice((index + 1), index + 3));
                    console.log(strikeSum);
                    return sum + strikeSum;
                case 0:
                    return _this.calculateSpare(_this.frames[index + 1]);
                case 2:
                    return frameSum + sum;
                default:
                    return sum;
            }
            var _a;
        }, 0);
        return sum;
    };
    return Game;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
