const btn = document.querySelector('button');
const clear = document.querySelector('.clear');
const rainbow = document.querySelector('.rainbow');
const colorPicker = document.querySelector('#colorpicker');
const shade = document.querySelector('.shadow');

function initialGrid() {
  for (i = 0; i < 16 ** 2; i++) {
    const div = document.createElement('div');
    div.classList.add('initialSquare');
    div.style.flexBasis = `calc(100% / 16)`;
    container.appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", initialGrid);

btn.addEventListener('click', function() {
  let userPrompt = prompt("Choose the side of your grid(up to 100x100).");
  userPrompt = parseInt(userPrompt);
  if (userPrompt > 100 || userPrompt < 1 || isNaN(userPrompt)) {
    alert("Please add a valid value.");
    return;
  }
  const initialG = document.querySelectorAll('.initialSquare');
  initialG.forEach(item => item.parentNode.removeChild(item));
  const divs = document.querySelectorAll('.square');
  divs.forEach(item => item.parentNode.removeChild(item));
  for (i = 0; i < userPrompt ** 2; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    div.style.flexBasis = `calc(100% / ${userPrompt})`;
    document.getElementById('container').appendChild(div);
  }
})

function colorPick(e) {
  if (!e.target.classList.contains('square') &&
      !e.target.classList.contains('initialSquare')) return;
  const chosenColor = document.querySelector('#colorpicker').value;
  e.target.style.background = `${chosenColor}`;
  e.target.style.filter = '';
}

colorPicker.addEventListener('click', () => {
  container.addEventListener('mouseover', colorPick);
})

function clearGrid() {
  const iSquares = document.querySelectorAll('.initialSquare');
  iSquares.forEach(item => {
    item.style.background = 'white';
    item.style.filter = '';
  });
  const squares = document.querySelectorAll('.square');
  squares.forEach(item => {
    item.style.background = 'white';
    item.style.filter = '';
  });
}

clear.addEventListener('click', clearGrid);

function rgbRandomizer(e) {
  if (!e.target.classList.contains('square') &&
      !e.target.classList.contains('initialSquare')) return;
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
    e.target.style.background = `rgb(${R}, ${G}, ${B})`;
    e.target.style.filter = '';
}

rainbow.addEventListener('click', () => {
  container.addEventListener('mouseover', rgbRandomizer);
})

function addShade(e) {
  container.removeEventListener('mouseover', colorPick)
  container.removeEventListener('mouseover', rgbRandomizer)
  if (!e.target.classList.contains('square') &&
      !e.target.classList.contains('initialSquare')) return;
  if (!e.target.style.filter) {
    e.target.style.filter = 'brightness(0.9)';
  } else if (e.target.style.filter) {
    const currentFilter = e.target.style.filter;
    e.target.style.filter = `brightness(0.${currentFilter.charAt(13) - 1})`
  }
}

shade.addEventListener('click', () => {
  container.addEventListener('mouseover', addShade);
  shade.parentNode.removeChild(shade);
  const removeShade = document.createElement('button');
  removeShade.classList.add('stopEvent');
  removeShade.textContent = 'Shade';
  const btnContainer = document.querySelector('#button-container');
  btnContainer.appendChild(removeShade);
  removeShade.addEventListener('click', () => {
  container.removeEventListener('mouseover', addShade);
  removeShade.parentNode.removeChild(removeShade);
  btnContainer.appendChild(shade);
  })
})

