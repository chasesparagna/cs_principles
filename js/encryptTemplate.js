//Comment pseudocode up here
// Objective take a message from a user and encrypt it
// Then using the cypher decrypt


/* 1. Get input from user
2. compute input and find its score
3. create an encyptKey that sets a new output for each char input which is letters
4. create a function that turns the letters char inputted into to their new encrypted value based on its index
5. then create new displays and buttons in the html to help format your page  
6.If have time, create decryption 

*/



// global variables go at the top
//setting points for each letter in the alphabet
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
//defining each character in the alphabet as letters
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//define the new encrypted values for each letter in the alphabet
let encryptKey = ["@" ,"#" ,"<" ,"%" ,"3" ,"?" ,"9" ,"~" ,"!" ,"¿" ,"+" ,"1" ,"^" ,":" ,"0" ,">" ,"*" , "®" , "ß" , "þ" ,"ü" , "¼" , "µ" , "©" ,"æ"]; 
//set default score equal to zero
let player1score = 0;
let player2score = 0; 

// utility functions
// check if is upper
function isupper(str) {
  return str === str.toUpperCase();
}

// check if is lower
function islower(str) {
  return str === str.toLowerCase();
}

// return points by associating the index of the letter with the POINTS array
function getPoints(letter){
  //allow index of the inputted value to be found
  let index = Letters.indexOf(letter);
  //return the value of the index for each letter
  return POINTS[index];
}

//computeScore function with parameter word
function computeScore(word){
  //set score equal to zero
    let score = 0;
    //set current into inputted char
    let current = "";
    //create for loop to find string length of the inputted word
    for (i = 0, n = word.length; i < n; i++){
      // set orginal characters described in 'letters' above equal to new char described in encryptKey
      let letters = encryptKey[i];
      //add new encrypted value to form new char
            currentword = currentword + i;
        //print in the console what the letter is 
        console.log("letter is " + (word[i]));
        //print in the console what the score of that letter is 
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        //add the points for each letter of the word
        score += getPoints(word[i].toLowerCase());
        //print in the console what the total score of the word
        console.log("final score here " + score);

       
    }
    return score;
    
}





//test the string hello in the function computeScore
computeScore("hello");


// SCOPE>>>>>>>>>>>

function getInputValue() {
  // Selecting the input element and get its value 
  return document.getElementById("inputId").value;
  // Displaying the value
}

//function encrypt(word){
//alert(word);

//let encryptedValue = [];
//for(let i=0; i<word.length; i++){
  //for(let j =0; j<letters.length; j++){
  //if(word[i] === letters[j] ){

 // }

//}

function doSomething(){
  //set the encypted value equal to what is inputted and calculated by getInputValue
  let encryptedValue = encrypt(getInputValue())
  //send alert to user displayed the new encryption 
  alert("Encrypted value is " + encryptedValue);
  //give final result of the value
  output(encryptedValue);
}
//preset eMsg to be 'secret message'
let eMsg = "secret message";

//access element on page and alter it dynamically
function output(content){
  //set first display equal to the inputed content
  document.getElementById("display1").innerHTML = content;
  //set second display equal to eMsg which is set to being 'secret message'
  document.getElementById("display2").innerHTML = eMsg;
  //set third display equal to hello, presetted message
  document.getElementById("display3").innerHTML = "hello";
}
