function input() {
    // Select the input field/element in an HTML document and get its value then return it
    return document.getElementById("inputId").value;
}

//access element on page and alter it dynamically using content parameter
function output(content) {
    document.getElementById("display1").innerHTML = content;
}

function encrypt(){
    let word = input();
    return word + word;
}

//function for processing the input from the field.  This one just spits back the input
function process() {    
    output(encrypt());
}