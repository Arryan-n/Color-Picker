const wheelEl = document.getElementById("colorwheel");
const btnEl = document.getElementById("btn");
const BaseUrl = "https://www.thecolorapi.com/scheme";
const mainEL = document.getElementById("colorgenBlocks");
const modeEL = document.getElementById("mode");
const copyEl = document.getElementById("copy");
const hexnames = document.getElementById("color-names");
const randomGen = Math.floor(Math.random() * 16777215);
const hex = document.getElementById("hex-names");
wheelEl.value = "#" + randomGen.toString(16);
getColors();

btnEl.addEventListener("click", () => {
  getColors();
});

function getColors() {
  const hexWithoutHash = wheelEl.value.substring(1);
  fetch(`${BaseUrl}?hex=${hexWithoutHash}&mode=${modeEL.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderColors(data.colors);
    });
}

function renderColors(colorArray) {
  mainEL.innerHTML = colorArray
    .map((color) => {
      return `
        <div 
          class = "colors"
          onclick = "copytoClipboard('${color.hex.value}')"
          style = "background-color: ${color.hex.value} " >
          <div id="hex-names" class="color-names">${color.name.value}</div>
        </div>
    `;
    })
    .join("");

  hexnames.innerHTML = colorArray
    .map((nameOfColor) => {
      return `
       <div class="color-hex-names">
          ${nameOfColor.hex.value}
       </div>
    `;
    })
    .join("");
}

function copytoClipboard(str) {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(str).then(() => {
      showcopied();
    });
  }
}
function showcopied() {
  setTimeout(() => {
    copyEl.innerHTML = `
    <p class = "copied">Copied</p>
`;
  }, 0);

  setTimeout(() => {
    copyEl.innerHTML = `
    
`;
  }, 1500);
}
