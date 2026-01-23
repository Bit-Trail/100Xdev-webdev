var abc = {};
var bdc;
function displayResult() {
    let x = 1;
    const y = 2;
    abc = "Hello World";
    console.log(abc);
    console.log(bdc);
    let sum = add(x,y);
    document.getElementById("test").innerHTML = "The sum of " + x + " and " + y + " is " + sum + ".";
}

function add(a, b) {
    return a + b;
}