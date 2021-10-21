// only javascript goes here NO HTML...
  //send alert prior to revealing the page
alert("Najee Harris incoming");
  //in the console, print message below
console.log("this is coming from a separate file...")
//allow variable to equal 5 
let myVar = 5;
// in the console, print message below
console.log("my first console message");
// set type in console as a variable
console.log(myVar); 

// bool

//set true statement 
let playing = true;
//set width to 200
let width = 200;
// set height ti 450
let height = 450;
//distinguish player one being Tim
var player1 = "Tim";
//setting consant of player 2 being Ralph
const player2 = "Ralph";


// for loops in js
for (i=0; i<10; i++){
    console.log(i);
    draw(i+20, i+50, i+100);
}

function draw() {
  // variable that allows the code to look for an element in the HTML document with an ID of canvas
    var canvas = document.getElementById('canvas');
    //if statement for canvas
    if (canvas.getContext) {
      //set variable to context 
      var ctx = canvas.getContext('2d');
      //set context style with rgb value 
      ctx.fillStyle = 'rgb(200, 0, 0)';
      //give dimensions for context or drawing
      ctx.fillRect(x, y, width, height);
      // set context style with rgb value
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      //set dimensions for context
      ctx.fillRect(30, 30, 50, 50);
    }
  }

  draw();