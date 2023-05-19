const titleELement = document.createElement("h1");
titleELement.setAttribute("id", "title");
titleELement.textContent = "Paleta de Cores";
document.body.appendChild(titleELement);

/*-------------------------------------------------------------------*/

/*-------------------------------------------------------------------*/
const colors = ["#000000", "#00FF00", "#0000FF", "#FFFF00"];
const paletteElement = document.createElement("div");
paletteElement.setAttribute("id", "color-palette");

const pixelBoard = document.createElement("div");
pixelBoard.setAttribute("id", "pixel-board");

const titleElement = document.querySelector("h1#title");
titleElement.parentNode.insertBefore(paletteElement, titleElement.nextSibling);
paletteElement.parentNode.insertBefore(pixelBoard, paletteElement.nextSibling);

const corUnica = [];

for (let i = 0; i < colors.length; i++) {
  const color = colors[i];

  if (color !== "#FFFFFF" && !corUnica.includes(color)) {
    corUnica.push(color);

    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.style.backgroundColor = color;
    paletteElement.appendChild(colorElement);
  }
}

const buttonElement = document.createElement("button");
buttonElement.setAttribute("id", "button-random-color");
buttonElement.textContent = "Cores aleatórias";
paletteElement.parentNode.insertBefore(buttonElement, paletteElement.nextSibling);

buttonElement.addEventListener("click", generateRandomPalette);

function generateRandomPalette() {
  const randomColors = generateRandomColors(3);
  const colorElements = paletteElement.getElementsByClassName("color");

  for (let i = 1; i < colorElements.length; i++) {
    colorElements[i].style.backgroundColor = randomColors[i - 1];
  }
}

function generateRandomColors(count) {
  const randomColors = [];

  for (let i = 0; i < count; i++) {
    let randomColor;

    do {
      randomColor = getRandomColor();
    } while (randomColors.includes(randomColor));

    randomColors.push(randomColor);
  }

  return randomColors;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

for (let i = 0; i < 25; i++) {
  const pixelElement = document.createElement("div");
  pixelElement.classList.add("pixel");
  pixelElement.style.width = "40px";
  pixelElement.style.height = "40px";
  pixelElement.style.backgroundColor = "#FFFFFF";
  pixelElement.style.border = "1px solid black";
  pixelElement.style.display = "inline-block";
  pixelElement.style.marginRight = "5px";
  pixelBoard.appendChild(pixelElement);
}


const pixelElements = document.getElementsByClassName("pixel");
const pixelCount = pixelElements.length;
const expectedPixelCount = 5;

if (pixelCount !== expectedPixelCount) {
  console.error("comprimento de 5 elementos.");
}


/*-------------------------------------------------------------------*/
