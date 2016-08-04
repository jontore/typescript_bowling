import ScoreEnum from './scoreEnum';

class Frame {
  rolls: Array<number>;
  public last: boolean;
  constructor(last: boolean) {
    this.rolls = [];
    this.last = last;
  }
  public addRoll(score: number) {
    this.rolls.push(score);
  }

  public isComplete(): boolean {
    const hasTwoRolls = this.rolls.length === 2;
    let frameSum: number;
    let type: ScoreEnum;
    [type, frameSum] = this.calculateScore();
    if(!this.last) {
      return hasTwoRolls || type === ScoreEnum.Strike;
    }
    if (this.rolls.length < 2) {
      return false;
    }
    if(type !== ScoreEnum.Normal && hasTwoRolls) {
      return false;
    }
    return true;
  }

  public calculateScore(): Array<number> {
    let Score: [ScoreEnum, number];
    let sum = this.rolls.length == 0 ? 0 : this.rolls.reduce((sum, val) => {
      return sum + val;
    });
    const hasStrike = this.rolls.some((val) => val === 10);

    if (hasStrike) {
      return [ScoreEnum.Strike, sum];
    }
    if (sum >= 10) {
      return [ScoreEnum.Spare, sum];
    }
    return [ScoreEnum.Normal, sum];
  }

  public getFirstRoll(): number {
    return this.rolls.length > 0 ? this.rolls[0] : 0;
  }
}

export default Frame;
