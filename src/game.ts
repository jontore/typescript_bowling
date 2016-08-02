import Frame from "./frame";
import ScoreEnum from "./scoreEnum";

class Game {
  private currentFrameIndex: number;
  public frames: Array<Frame>;
  constructor() {
    this.frames = [];
    this.currentFrameIndex = 0;
    for(var i = 0; i < 10; i++) {
      this.frames.push(new Frame());
    }
  }
  nextFrame(): Frame{
    this.currentFrameIndex++;
    return this.frames[this.currentFrameIndex];
  }
  calculateStrike(nextFrames: Array<Frame>): number {
    const maxRolls: number = 3;
    let rolls: Array<number> = [ 10 ];
    for (let frame of nextFrames) {
      const numberOfRollLeft: number = maxRolls - rolls.length;
      const newRolls:Array<number> = frame.rolls.slice(0, numberOfRollLeft);
      rolls = [...rolls, ...newRolls];
    };
    return rolls.reduce((sum, roll) => { return sum + roll; });
  }
  calculateSpare(nextFrame: Frame): number {
    let sum = 10;
    return sum += nextFrame.getFirstRoll();
  }
  calculateScore(): number {
    let sum = this.frames.reduce((sum, frame, index) => {
        let frameSum: number;
        let type: ScoreEnum;
        [type, frameSum] = frame.calculateScore();
        switch(type) {
          case ScoreEnum.Strike:
            let strikeSum = this.calculateStrike(this.frames.slice((index + 1), index + 3));
            return sum + strikeSum;
          case ScoreEnum.Spare:
            return this.calculateSpare(this.frames[index + 1]);
          case ScoreEnum.Normal:
            return frameSum + sum;
          default:
            return sum;
        }
    }, 0);
    return sum;
  }
}

export default Game;
