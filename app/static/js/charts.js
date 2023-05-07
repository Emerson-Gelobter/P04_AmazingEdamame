//Fib
function fib(n){
    if (n == 0 || n == 1){
        return n
    }else{
        return (fib(n-1) + fib(n-2))
    }
  }
  
  var addFib = function(text) {
    var list = document.getElementById("foo"); //this is an HTML ID Tag. in index.html it is for the <ol> or ordered list
    var newitem = document.createElement("li"); 
    newitem.innerHTML = "The third term in the Fibonacci Sequence is " + fib(3); //we are adding a entry of the text inside the ordered list with the JS function
    list.appendChild(newitem);
  };
