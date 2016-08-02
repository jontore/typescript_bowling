import ScoreEnum from './scoreEnum';

class Frame {
  rolls: Array<number>;
  constructor() {
    this.rolls = [];
  }
  public addRoll(score: number) {
    this.rolls.push(score);
  }

  public calculateScore(): Array<number> {
    let Score: [ScoreEnum, number];
    let sum = this.rolls.length == 0 ? 0 : this.rolls.reduce((sum, val) => {
      return sum + val;
    });

    if (this.rolls.length === 1 && sum === 10) {
      return [ScoreEnum.Strike, sum];
    }
    if (sum === 10) {
      return [ScoreEnum.Spare, sum];
    }
    return [ScoreEnum.Normal, sum];
  }

  public getFirstRoll(): number {
    return this.rolls.length > 0 ? this.rolls[0] : 0;
  }
}

export default Frame;
