const grid = document.querySelector('.gridContainer');
const colorInput = document.getElementById("color");
const clear = document.getElementById("clear");
const rainbow = document.getElementById("rainbow");
const slider = document.getElementById("size");
let currentlyActive = false;

window.onload = () => {
  setupGrid();
}
colorInput.addEventListener('click', pickColor);
slider.addEventListener('change', setupGrid);
clear.addEventListener('click', clearGrid);
rainbow.addEventListener('click', paintRainbow);


//set Grid:
function setupGrid() {
  let start = Array.from(grid.querySelectorAll("div"));
  start.forEach(divs => divs.remove());
  let num = slider.value;
  let area = num * num;
  for(let i = 0; i< area; i++){
      const div = document.createElement('div');
      div.classList.add("square");
      grid.style.setProperty("grid-template-columns", `repeat(${num}, 2fr)`);
      grid.style.setProperty("grid-template-columns", `repeat(${num}, 2fr)`);
      grid.appendChild(div);
      var divs = Array.from(document.querySelectorAll('div.square'));
  }
  divs.forEach(div => div.addEventListener('click', paintThis));
  
}

// call paint func at click:
function paintThis() {
  var divs = Array.from(document.querySelectorAll('div.square')); 
    if(!currentlyActive){
      divs.forEach(item => item.addEventListener("mousemove", paint));
      currentlyActive = true;
    } else {
      divs.forEach(item => {
        item.removeEventListener("mousemove", paint);
        currentlyActive = false;
      })
    }
}

//set the color of brush:
function pickColor(e){
  colorInput.value= `${e.target.value}`;
  paintThis();
}

function makeRainbow(e){
  let color = Math.floor(Math.random()*16777215).toString(16);
  e.target.style.backgroundColor =  `#${color}`;
}
//select rainbow brush:
function paintRainbow(){
  rainbow.classList.toggle("true");
  var divs = Array.from(document.querySelectorAll('div.square'));
  divs.forEach(item => item.addEventListener("click", function(){
    if(currentlyActive){
      divs.forEach(item => item.addEventListener("mousemove", makeRainbow));
    } else {
      divs.forEach(item => item.removeEventListener("mousemove", makeRainbow));
      
    }
 }))  
}
//paint 
function paint(e){
  target = e.target;
  target.style.backgroundColor = colorInput.value;
}

//erase all divs:
function clearGrid() {
  var divs = Array.from(document.querySelectorAll('div.square'));
  divs.forEach(div => div.style.backgroundColor = 'rgba(255, 255, 255, 0.582)');
}




