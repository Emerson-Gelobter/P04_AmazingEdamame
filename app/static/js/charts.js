import * as d3 from "./d3.js";

//Fib
// function fib(n){
//     if (n == 0 || n == 1){
//         return n
//     }else{
//         return (fib(n-1) + fib(n-2))
//     }
//   }


//   var addFib = function(text) {
//     var list = document.getElementById("fiblist");
//     var newitem = document.createElement("li");
//     newitem.innerHTML = text;
//     list.appendChild(newitem);
//   };

// // FIB BUTTONs
// var fb = document.getElementById("fibbutton")
// fibbutton.addEventListener('click', fibaction)
// //addFib("works up to here")

// function fibaction() {
//   var ans = document.createElement("li")
//   //ans.innerHTML = fib(Number(document.getElementById('fibinput').getAttribute()))
//   ans.innerHTML= document.getElementById('fibinput').value + ": " + fib(Number(document.getElementById('fibinput').value))
//   document.getElementById("fiblist").appendChild(ans)
//   //addFib(fib(10))
// }
//=================================
const data = [1,2,3,4]
const width = 420;
x = d3.scaleLinear()
    .domain([0,d3.max(data)])
    .range([0,width])
y = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0,20 * data.length])

function sales(){
  const div = d3.create("div")
     .style("font", "10px sans-serif")
     .style("text-align", "right")
     .style("color", "white");

  div.selectAll("div")
     .data(data)
     .join("div")
     .style("background", "steelblue")
     .style("padding", "3px")
     .style("margin", "1px")
     .style("width", d => `${d * 10}px`)
     .text(d => d);

  return div.node();
}

//====================

//imports
// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('./app/zetten.db', (err) => {
//   if (err) {
//     console.log("whoops");
//   }
//   console.log('we connected');
// });
//import {LineChart} from "@d3/line-chart"
//return



import {PieChart} from "@d3/pie-chart"
values = array(4) [20, 40, 10, 30]

console.log(("pies!"))
console.log(PieChart(values))
document.getElementById("piechart").appendChild(PieChart(values))