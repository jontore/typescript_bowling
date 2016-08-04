import Frame from "./frame";
import ScoreEnum from "./scoreEnum";

class Game {
  private currentFrameIndex: number;
  public frames: Array<Frame>;
  constructor() {
    this.frames = [];
    this.currentFrameIndex = 0;
    for(var i = 0; i < 10; i++) {
      this.frames.push(new Frame(i === 9));
    }
  }
  public nextFrame(): Frame {
    if (this.currentFrameIndex < 9) {
      this.currentFrameIndex++;
    }
    return this.getCurrentFrame();
  }
  public getCurrentFrame(): Frame {
    return this.frames[this.currentFrameIndex];
  }
  public isComplete(): Boolean {
    return (this.currentFrameIndex === (this.frames.length - 1)) && this.getCurrentFrame().isComplete();
  }
  private calculateStrike(frameSum: number, nextFrames: Array<Frame>): number {
    const maxRolls: number = 3;
    let rolls: Array<number> = [ frameSum ];
    for (let frame of nextFrames) {
      const numberOfRollLeft: number = maxRolls - rolls.length;
      const newRolls:Array<number> = frame.rolls.slice(0, numberOfRollLeft);
      rolls = [...rolls, ...newRolls];
    };
    return rolls.reduce((sum, roll) => { return sum + roll; });
  }
  private calculateSpare(frameSum: number, nextFrame: Frame): number {
    let sum = frameSum;
    return sum += nextFrame.getFirstRoll();
  }
  public calculateScore(): number {
    let sum = this.frames.reduce((sum, frame, index) => {
        let frameSum: number;
        let type: ScoreEnum;
        [type, frameSum] = frame.calculateScore();
        switch(type) {
          case ScoreEnum.Strike:
            let strikeSum = this.calculateStrike(frameSum, this.frames.slice((index + 1), index + 3));
            return sum + strikeSum;
          case ScoreEnum.Spare:
            return this.calculateSpare(frameSum, this.frames[index + 1]);
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
