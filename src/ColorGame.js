var num_squares = 6;
var colors = [];
var picked_color = pickColor();
var squares = document.querySelectorAll(".square");
var color_display = document.getElementById("colorDisplay");
var message_display = document.querySelector("#message");
var header_title = document.querySelector("h1");
var reset_button = document.querySelector("#reset");
var mode_buttons = document.querySelectorAll(".mode");


init();

function init(){
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons(){
  for(var i = 0; i < mode_buttons.length; i++){
    mode_buttons[i].addEventListener("click", function(){
      mode_buttons[0].classList.remove("selected");
      mode_buttons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? num_squares = 3: num_squares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for(var i = 0; i < squares.length; i++){
    // Add click listeners to squares
    squares[i].addEventListener("click", function(){
      // Grab color of clicked square
      var clicked_color = this.style.backgroundColor;
      // Compare color to picked_color
      if(clicked_color === picked_color){
        message_display.textContent = "Correct!";
        reset_button.textContent = "Play Again?";
        changeColors(clicked_color);
        header_title.style.background = picked_color;
      } else {
        this.style.background = "#222";
        message_display.textContent = "Try Again";
      }
    });
  }
}

function reset(){
  // Generate new colorDisplay
  colors = generateRandomColors(num_squares);
  // Pick a new color from array
  picked_color = pickColor();
  // Change color_display to match picked_color
  color_display.textContent = picked_color;
  reset_button.textContent = "New Colors";
  message_display.textContent = "";
  // Change colors of squares
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  header_title.style.background = "steelblue";
}

reset_button.addEventListener("click", function(){
  reset();
});

function changeColors(color){
  // Loop through all squares
  for(var i = 0; i < squares.length; i++){
    squares[i].style.background = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  // Make an array
  arr = []
  // Repeat num times
  for(var i = 0; i < num; i++){
    // Get random color and push into array
    arr.push(randomColor());
  }
  // Return that array
  return arr;
}

function randomColor() {
  // Pick a "red" from 0 to 255
  var r = Math.floor(Math.random() * 256);
  // Pick a "green" from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // Pick a "blue" from 0 to 255
  var b = Math.floor(Math.random() * 256);
  // Pack colors into rgb-format string
  return "rgb(" + r + ", " + g + ", " + b + ")";
}