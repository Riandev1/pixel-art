const titleELement = document.createElement("h1");
titleELement.setAttribute("id", "title");
titleELement.textContent = "Paleta de Cores";
document.body.appendChild(titleELement);

/*-------------------------------------------------------------------*/
const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];

const paletteElement = document.createElement("div");
paletteElement.setAttribute("id", "color-palette");

const titleElement = document.querySelector("h1#title");
titleElement.parentNode.insertBefore(paletteElement, titleElement.nextSibling);

const corUnica = [];

for (let i = 0; i < colors.length; i++) {
  const color = colors[i];

  if (color !== "#FFFFFF" && !corUnica.includes(color)) {
    corUnica.push(color);

    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.style.backgroundColor = color;
    colorElement.style.border = "1px solid black";
    colorElement.style.display = "inline-block";
    colorElement.style.marginRight = "5px";
    paletteElement.appendChild(colorElement);
  }
}


const colorElements = paletteElement.getElementsByClassName("color");
let colorsFound = [];

for (let i = 0; i < colorElements.length; i++) {
  let color = colorElements[i].style.backgroundColor;
  colorsFound.push(color);
}

let allColorsPresent = colors.every(function(color) {
  return colorsFound.includes(color);
});

/* ---------------------------------------------------------------*/

