import * as d3 from "./d3.js";
import map from "./src/map.js";
import range from "./src/range.js";


console.log(("pies!"))
console.log(values)

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/pie-chart
function PieChart(data, {
  name = ([x]) => x,  // given d in data, returns the (ordinal) label
  value = ([, y]) => y, // given d in data, returns the (quantitative) value
  title, // given d in data, returns the title text
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  innerRadius = 0, // inner radius of pie, in pixels (non-zero for donut)
  outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
  labelRadius = (innerRadius * 0.2 + outerRadius * 0.8), // center radius of labels
  format = ",", // a format specifier for values (in the label)
  names, // array of names (the domain of the color scale)
  colors, // array of colors for names
  stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
  strokeWidth = 1, // width of stroke separating wedges
  strokeLinejoin = "round", // line join of stroke separating wedges
  padAngle = stroke === "none" ? 1 / outerRadius : 0, // angular separation between wedges
} = {}) {
  // Compute values.
  const N = map(data, name);
  const V = map(data, value);
  const I = range(N.length).filter(i => !isNaN(V[i]));

  // Unique the names.
  if (names === undefined) names = N;
  names = new d3.InternSet(names);
  // check for js syntax errors 


  // Chose a default color scheme based on cardinality.
  if (colors === undefined) colors = d3.schemeSpectral[names.size];
  if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);

  // Construct scales.
  const color = d3.scaleOrdinal(names, colors);

  // Compute titles.
  if (title === undefined) {
    const formatValue = d3.format(format);
    title = i => `${N[i]}\n${formatValue(V[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  // Construct arcs.
  const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
  
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin)
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", d => color(N[d.data]))
      .attr("d", arc)
    .append("title")
      .text(d => title(d.data));

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .selectAll("tspan")
    .data(d => {
      const lines = `${title(d.data)}`.split(/\n/);
      return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
    })
    .join("tspan")
      .attr("x", 0)
      .attr("y", (_, i) => `${i * 1.1}em`)
      .attr("font-weight", (_, i) => i ? null : "bold")
      .text(d => d);

  return Object.assign(svg.node(), {scales: {color}});
}

var values = [20, 40, 10, 30];

chart = PieChart(values, {
  name: d => d.name,
  value: d => d.value,
  width: 500,
  height: 500,
  new d3.InternSet(names)

})



// =====================

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

function LineChart(data, {
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  defined, // for gaps in data
  curve = d3.curveLinear, // method of interpolation between points
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xType = d3.scaleUtc, // the x-scale type
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  yType = d3.scaleLinear, // the y-scale type
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  color = "currentColor", // stroke color of line
  strokeLinecap = "round", // stroke line cap of the line
  strokeLinejoin = "round", // stroke line join of the line
  strokeWidth = 1.5, // stroke width of line, in pixels
  strokeOpacity = 1, // stroke opacity of line
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(X.length);
  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D = d3.map(data, defined);

  // Compute default domains.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Construct a line generator.
  const line = d3.line()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", line(I));

  return svg.node();
}


chart = LinearChart(values, {
  name: d => d.name,
  value: d => d.value,
  yLabel: "AVERAGE HOUSE PRICES",
  xLabel: "YEARS",
  width: 500,
  height: 500,
})