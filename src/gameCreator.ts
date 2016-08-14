import Game from "./game";
import gameRender from "./gameRender";
import createRandomButton from "./randomNumberButton";

const game = new Game();

function render(el:HTMLElement) {
  const gameEl = document.createElement('div');
  gameEl.innerHTML = gameRender(game);

  const randomButtonEl = createRandomButton(() => {
    const currentFrame = game.getCurrentFrame();
    const [type, frameScore] = currentFrame.calculateScore();
    const randomRoll = Math.ceil(Math.random() * (10 - frameScore));
    currentFrame.addRoll(randomRoll);
    gameEl.innerHTML = gameRender(game);

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

export default render;
