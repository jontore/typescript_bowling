import Frame from "./frame";
import Game from "./game";
import ScoreEnum from "./scoreEnum";

function renderLastFrame(type:ScoreEnum, frameSum:number, frame: Frame):string {
  switch(type) {
    case ScoreEnum.Strike:
    case ScoreEnum.Spare:
      return frame.rolls.reduce((domStr:string, roll:number) => {
        return domStr + `<td>${roll === 10 ? 'X' : roll}</td>`;
      }, '');
    default:
      return renderNormalFrame(type, frameSum, frame);
  }
}

function renderNormalFrame(type:ScoreEnum, frameSum:number, frame: Frame):string {
  switch(type) {
    case ScoreEnum.Spare:
      return `<td>${frame.getFirstRoll()} /</td>`;
    case ScoreEnum.Strike:
      return '<td>X</td>';
    default:
      return frame.rolls.reduce((domStr:string, roll:number) => {
        return domStr + `<td>${roll}</td>`;
      }, '');
  }
}

function renderFrame(frame:Frame):string {
  let frameSum: number;
  let type: ScoreEnum;
  [type, frameSum] = frame.calculateScore();
  return !frame.last ? renderNormalFrame(type, frameSum, frame) : renderLastFrame(type, frameSum, frame);
}

function gameRender(game:Game):string {
  const framesRenderd = game.frames.reduce((domStr:string, frame:Frame, index:number) => {
    return domStr + `<tr><th>${index}:</th> ${renderFrame(frame)}</tr>`
  },'');

  return `<table>${framesRenderd}</table> Score: ${game.calculateScore()}`;
}

export default gameRender;
