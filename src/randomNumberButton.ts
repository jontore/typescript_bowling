function createRandomButton(onRandom:Function):HTMLElement {
  var button = document.createElement('button');
  button.innerText = 'Random roll';
  button.addEventListener('click', ()  => {onRandom()});
  return button;
}

export default createRandomButton;
