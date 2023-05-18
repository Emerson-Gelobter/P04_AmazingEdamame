import * as d3 from "./d3.js";

  var data = function(e){
    fetch(e).then(res => res.json()).then(data => {
    
      for (let i=0; i<data.length;i+=7){
      var inner = data[i];
      white = inner[7];
      black = inner[8];
      asian = inner[9];
      other = inner[10]
      hispanic = inner[11];
      
    }
    })};
    console.log(data)

    // Step 3
    var svg = select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = 200;


    var g = svg.append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Step 4
    var ordScale = d3.scaleOrdinal()
                      .domain(data)
                      .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);

    // Step 5
    var pie = d3.pie().value(function(d) { 
            return d.share; 
        });

    var arc = g.selectAll("arc")
              .data(pie(data))
              .enter();

    // Step 6
    var path = d3.arc()
                .outerRadius(radius)
                .innerRadius(0);

    arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return ordScale(d.data.name); });

    // Step 7
    var label = d3.arc()
                  .outerRadius(radius)
                  .innerRadius(0);
        
    arc.append("text")
      .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
        })
      .text(function(d) { return d.data.name; })
      .style("font-family", "arial")
      .style("font-size", 15);


  // ===================================

// x = d3.scaleLinear()
//     .domain([0,d3.max(data)])
//     .range([0,width])
// y = d3.scaleBand()
//     .domain(d3.range(data.length))
//     .range([0,20 * data.length])

// function sales(){
//   const div = d3.create("div")
//      .style("font", "10px sans-serif")
//      .style("text-align", "right")
//      .style("color", "white");

//   div.selectAll("div")
//      .data(data)
//      .join("div")
//      .style("background", "steelblue")
//      .style("padding", "3px")
//      .style("margin", "1px")
//      .style("width", d => `${d * 10}px`)
//      .text(d => d);

//   return div.node();
// }