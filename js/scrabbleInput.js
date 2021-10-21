
//global variables go at the top
//set point values for each letter in the alphabet 
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
//defining each character in the alphabet 
let Letters = ['a', 'b', 'c', 'd',' e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',' u', 'v', 'w', 'x', 'y', 'z']
//setting both player one and player two's score equal to zero
let player1score = 0;
let player2score = 0;

// utility functinos just below the top


// check if is upper
//describe function isupper
function isupper(str) {
  //get the string of the upper case letters
    return str === str.toUpperCase();
  }
  // check if is lower
  //describe function islower
  function islower(str) {
    //get string and setting it equal to upper case
    return str === str.toUpperCase();
  }
 //return points by associating the index of the letter with the points array
function getPoints(letter){
    let index = Letters.indexOf(letter)
    return POINTS[index];

}

//console.log("testing point function" + getPoints("c"));


//console.log("testing index" + Letters.indexOf(c));


// utility functions cont.
//state function add and set varibles x and y
//function add(x,y){
  //set the sum equal to parameters x and y
   // let sum = x + y;
    //set string to sum
   // let strng = '$(sum)';
    //console.log(string.length);
    //print in console the sum is 
    //console.log("the sum is ", sum);
  //}
  //test imputs of x and y variables as x=6 and y=7
  //add(6,7);
  




//state function compute score and set parameter word
 function compute_score(word){
   //set default score equal to zero
     score = 0;
     //set default index equal to zero
     index = 0;
     // create for loop
     for (i = 0, n = word.length; i < n; i++){
        // if (islower(word[i])){
             //console.log("this is lower case");
             // printf("accounting for lower case\n");
            // index = word[i]-'a';
         //}
         //if (isupper(word[i])){
            // console.log(word[i] + "this is upper case");
             // printf("accounting for upper case\n");
            // index = word[i]-'A';
       // }
       //print response with the word inputted
       console.log("letter is " + (word[i]));
       //print the score for each letter
       console.log("letter score is " + getPoints(word[i].toLowerCase()));
       score += getPoints(word[i].toLowerCase());
       //print final score
       console.log("final score here " + score);
    }
 }
//test hello in compute_score
compute_score("hello");

// SCOPE >>>

let inputVal = null

function getInputValue() {
    // Selecting the input element and get its value 
    let inputVal = document.getElementById("inputId").value;
    // Displaying the value
    output();
  }
//state function doSomething
  function doSomething(){
    computeScore(getInputValue());
  }
//failing function due to inablitty to access element on page 
  function output(){
    document.getElementById("output").value = inputVal;
  }