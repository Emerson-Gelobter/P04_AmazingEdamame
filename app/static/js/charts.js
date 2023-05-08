//Fib
function fib(n){
    if (n == 0 || n == 1){
        return n
    }else{
        return (fib(n-1) + fib(n-2))
    }
  }


  var addFib = function(text) {
    var list = document.getElementById("fiblist");
    var newitem = document.createElement("li");
    newitem.innerHTML = text;
    list.appendChild(newitem);
  };
  

//charts for economics 
function 

// FIB BUTTONs
var fb = document.getElementById("fibbutton")
fibbutton.addEventListener('click', fibaction)
//addFib("works up to here")

function fibaction() {
  var ans = document.createElement("li")
  //ans.innerHTML = fib(Number(document.getElementById('fibinput').getAttribute()))
  ans.innerHTML= document.getElementById('fibinput').value + ": " + fib(Number(document.getElementById('fibinput').value))
  document.getElementById("fiblist").appendChild(ans)
  //addFib(fib(10))
}
