(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bowling"] = factory();
	else
		root["bowling"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var game_1 = __webpack_require__(1);
	var gameRender_1 = __webpack_require__(3);
	var randomNumberButton_1 = __webpack_require__(4);
	var game = new game_1["default"]();
	function render(el) {
	    var gameEl = document.createElement('div');
	    gameEl.innerHTML = gameRender_1["default"](game);
	    var randomButtonEl = randomNumberButton_1["default"](function () {
	        var currentFrame = game.getCurrentFrame();
	        var _a = currentFrame.calculateScore(), type = _a[0], frameScore = _a[1];
	        var randomRoll = Math.ceil(Math.random() * (10 - frameScore));
	        currentFrame.addRoll(randomRoll);
	        gameEl.innerHTML = gameRender_1["default"](game);
	        if (!game.isComplete() && currentFrame.isComplete()) {
	            game.nextFrame();
	        }
	        if (game.isComplete()) {
	            el.removeChild(randomButtonEl);
	        }
	    });
	    el.appendChild(gameEl);
	    el.appendChild(randomButtonEl);
	}
	exports.__esModule = true;
	exports["default"] = render;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var frame_1 = __webpack_require__(2);
	var Game = (function () {
	    function Game() {
	        this.frames = [];
	        this.currentFrameIndex = 0;
	        for (var i = 0; i < 10; i++) {
	            this.frames.push(new frame_1["default"](i === 9));
	        }
	    }
	    Game.prototype.nextFrame = function () {
	        if (this.currentFrameIndex < 9) {
	            this.currentFrameIndex++;
	        }
	        return this.getCurrentFrame();
	    };
	    Game.prototype.getCurrentFrame = function () {
	        return this.frames[this.currentFrameIndex];
	    };
	    Game.prototype.isComplete = function () {
	        return (this.currentFrameIndex === (this.frames.length - 1)) && this.getCurrentFrame().isComplete();
	    };
	    Game.prototype.calculateStrike = function (frameSum, nextFrames) {
	        var maxRolls = 3;
	        var rolls = [frameSum];
	        for (var _i = 0, nextFrames_1 = nextFrames; _i < nextFrames_1.length; _i++) {
	            var frame = nextFrames_1[_i];
	            var numberOfRollLeft = maxRolls - rolls.length;
	            var newRolls = frame.rolls.slice(0, numberOfRollLeft);
	            rolls = rolls.concat(newRolls);
	        }
	        ;
	        return rolls.reduce(function (sum, roll) { return sum + roll; });
	    };
	    Game.prototype.calculateSpare = function (frameSum, nextFrame) {
	        var sum = frameSum;
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
	                    var strikeSum = _this.calculateStrike(frameSum, _this.frames.slice((index + 1), index + 3));
	                    return sum + strikeSum;
	                case 0:
	                    return sum + _this.calculateSpare(frameSum, _this.frames[index + 1]);
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
	exports.__esModule = true;
	exports["default"] = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Frame = (function () {
	    function Frame(last) {
	        this.rolls = [];
	        this.last = last;
	    }
	    Frame.prototype.addRoll = function (score) {
	        this.rolls.push(score);
	    };
	    Frame.prototype.isComplete = function () {
	        var hasTwoRolls = this.rolls.length === 2;
	        var frameSum;
	        var type;
	        _a = this.calculateScore(), type = _a[0], frameSum = _a[1];
	        if (!this.last) {
	            return hasTwoRolls || type === 1;
	        }
	        if (this.rolls.length < 2) {
	            return false;
	        }
	        if (type !== 2 && hasTwoRolls) {
	            return false;
	        }
	        return true;
	        var _a;
	    };
	    Frame.prototype.calculateScore = function () {
	        var Score;
	        var sum = this.rolls.length == 0 ? 0 : this.rolls.reduce(function (sum, val) {
	            return sum + val;
	        });
	        var hasStrike = this.rolls.some(function (val) { return val === 10; });
	        if (hasStrike) {
	            return [1, sum];
	        }
	        if (sum >= 10) {
	            return [0, sum];
	        }
	        return [2, sum];
	    };
	    Frame.prototype.getFirstRoll = function () {
	        return this.rolls.length > 0 ? this.rolls[0] : 0;
	    };
	    return Frame;
	}());
	exports.__esModule = true;
	exports["default"] = Frame;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function renderLastFrame(type, frameSum, frame) {
	    switch (type) {
	        case 1:
	        case 0:
	            return frame.rolls.reduce(function (domStr, roll) {
	                return domStr + ("<td>" + (roll === 10 ? 'X' : roll) + "</td>");
	            }, '');
	        default:
	            return renderNormalFrame(type, frameSum, frame);
	    }
	}
	function renderNormalFrame(type, frameSum, frame) {
	    switch (type) {
	        case 0:
	            return "<td>" + frame.getFirstRoll() + " /</td>";
	        case 1:
	            return '<td>X</td>';
	        default:
	            return frame.rolls.reduce(function (domStr, roll) {
	                return domStr + ("<td>" + roll + "</td>");
	            }, '');
	    }
	}
	function renderFrame(frame) {
	    var frameSum;
	    var type;
	    _a = frame.calculateScore(), type = _a[0], frameSum = _a[1];
	    return !frame.last ? renderNormalFrame(type, frameSum, frame) : renderLastFrame(type, frameSum, frame);
	    var _a;
	}
	function gameRender(game) {
	    var framesRenderd = game.frames.reduce(function (domStr, frame, index) {
	        return domStr + ("<tr><th>" + index + ":</th> " + renderFrame(frame) + "</tr>");
	    }, '');
	    return "<table>" + framesRenderd + "</table> Score: " + game.calculateScore();
	}
	exports.__esModule = true;
	exports["default"] = gameRender;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	function createRandomButton(onRandom) {
	    var button = document.createElement('button');
	    button.innerText = 'Random roll';
	    button.addEventListener('click', function () { onRandom(); });
	    return button;
	}
	exports.__esModule = true;
	exports["default"] = createRandomButton;


/***/ }
/******/ ])
});
;