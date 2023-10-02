const titleELement = document.createElement('h1');
titleELement.setAttribute('id', 'title');
titleELement.textContent = 'Paleta de Cores';
document.body.appendChild(titleELement);

// eslint-disable-next-line spaced-comment
/*=====================================================================*/

const colors = ['#000000', '#00FF00', '#0000FF', '#FFFF00'];
const paletteElement = document.createElement('div');
paletteElement.setAttribute('id', 'color-palette');

const pixelBoard = document.createElement('div');
pixelBoard.setAttribute('id', 'pixel-board');

const titleElement = document.querySelector('h1#title');
titleElement.parentNode.insertBefore(paletteElement, titleElement.nextSibling);
paletteElement.parentNode.insertBefore(pixelBoard, paletteElement.nextSibling);

const corUnica = [];

function createColorPalette() {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    if (color !== '#FFFFFF' && !corUnica.includes(color)) {
      corUnica.push(color);

      const colorElement = document.createElement('div');
      colorElement.classList.add('color');
      colorElement.style.backgroundColor = color;
      paletteElement.appendChild(colorElement);
    }
  }
}

function savePaletteToLocalStorage() {
  const colorElements = paletteElement.getElementsByClassName('color');
  const paletteColors = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < colorElements.length; i++) {
    const colorElement = colorElements[i];
    const color = colorElement.style.backgroundColor;

    paletteColors.push(color);
  }

  localStorage.setItem('colorPalette', JSON.stringify(paletteColors));
}
const savedPalette = localStorage.getItem('colorPalette');

if (savedPalette) {
  const savedColors = JSON.parse(savedPalette);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < savedColors.length; i++) {
    const color = savedColors[i];

    const colorElement = document.createElement('div');
    colorElement.classList.add('color');
    colorElement.style.backgroundColor = color;
    paletteElement.appendChild(colorElement);
  }
} else {
  createColorPalette();
  savePaletteToLocalStorage();
}

paletteElement.addEventListener('change', savePaletteToLocalStorage);

const buttonElement = document.createElement('button');
buttonElement.setAttribute('id', 'button-random-color');
buttonElement.textContent = 'Cores aleatórias';
paletteElement.parentNode.insertBefore(
  buttonElement,
  paletteElement.nextSibling,
);

function generateRandomPalette() {
  // eslint-disable-next-line no-use-before-define
  const randomColors = generateRandomColors(3);
  const colorElements = paletteElement.getElementsByClassName('color');

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < colorElements.length; i++) {
    colorElements[i].style.backgroundColor = randomColors[i - 1];
  }

  savePaletteToLocalStorage();
}

buttonElement.addEventListener('click', generateRandomPalette);

function generateRandomColors(count) {
  const randomColors = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    let randomColor;

    do {
      // eslint-disable-next-line no-use-before-define
      randomColor = getRandomColor();
    } while (randomColors.includes(randomColor));

    randomColors.push(randomColor);
  }

  return randomColors;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 25; i++) {
  const pixelElement = document.createElement('div');
  pixelElement.classList.add('pixel');
  pixelElement.style.width = '40px';
  pixelElement.style.height = '40px';
  pixelElement.style.backgroundColor = '#FFFFFF';
  pixelElement.style.border = '1px solid black';
  pixelElement.style.display = 'inline-block';
  pixelElement.style.marginRight = '5px';
  pixelElement.dataset.position = i.toString();
  pixelBoard.appendChild(pixelElement);
}

// eslint-disable-next-line spaced-comment
/*===================================================================== */

const selectedColorClass = 'selected';

// eslint-disable-next-line no-unused-vars
const defaultSelectedColor = '#000000';
const colorElements = paletteElement.getElementsByClassName('color');
colorElements[0].classList.add(selectedColorClass);

// eslint-disable-next-line no-plusplus
for (let i = 1; i < colorElements.length; i++) {
  colorElements[i].classList.remove(selectedColorClass);
}

// eslint-disable-next-line no-restricted-syntax
for (const colorElement of colorElements) {
  colorElement.addEventListener('click', function () {
    // eslint-disable-next-line no-restricted-syntax
    for (const element of colorElements) {
      element.classList.remove(selectedColorClass);
    }
    this.classList.add(selectedColorClass);
  });
}

// eslint-disable-next-line spaced-comment
/*===================================================================== */

function paintPixel(event) {
  const selectedColor = paletteElement.querySelector(`.${selectedColorClass}`)
    .style.backgroundColor;
  // eslint-disable-next-line no-param-reassign
  event.target.style.backgroundColor = selectedColor;

  // eslint-disable-next-line no-use-before-define
  savePixelBoardToLocalStorage();
}

const pixelElements = pixelBoard.getElementsByClassName('pixel');
// eslint-disable-next-line no-restricted-syntax
for (const pixelElement of pixelElements) {
  pixelElement.addEventListener('click', paintPixel);
}

function savePixelBoardToLocalStorage() {
  // eslint-disable-next-line no-shadow
  const pixelElements = document.querySelectorAll('#pixel-board .pixel');
  const pixelData = [];

  pixelElements.forEach((pixelElement) => {
    const pixelColor = pixelElement.style.backgroundColor;
    const pixelPosition = pixelElement.dataset.position;

    pixelData.push({ color: pixelColor, position: pixelPosition });
  });

  localStorage.setItem('pixelBoard', JSON.stringify(pixelData));
}

const savedPixelBoard = localStorage.getItem('pixelBoard');

if (savedPixelBoard) {
  const savedPixelData = JSON.parse(savedPixelBoard);

  savedPixelData.forEach((pixel) => {
    const { color, position } = pixel;
    const pixelElement = document.querySelector(
      `div[data-position="${position}"]`,
    );
    pixelElement.style.backgroundColor = color;
  });
}

const buttonClearElement = document.createElement('button');
buttonClearElement.setAttribute('id', 'clear-board');
buttonClearElement.textContent = 'Limpar';

paletteElement.insertAdjacentElement('afterend', buttonClearElement);

// eslint-disable-next-line no-use-before-define
buttonClearElement.addEventListener('click', clearBoard);

function clearBoard() {
  // eslint-disable-next-line no-shadow
  const pixelElements = document.querySelectorAll('#pixel-board .pixel');
  pixelElements.forEach((pixelElement) => {
    // eslint-disable-next-line no-param-reassign
    pixelElement.style.backgroundColor = '#FFFFFF';
  });

  savePixelBoardToLocalStorage();
}
