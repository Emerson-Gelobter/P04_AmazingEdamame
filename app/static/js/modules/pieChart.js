var getDemographics = function(e){
  fetch(e).then(res => res.json()).then(data => {
  for (let i=0; i<data.length;i++){
  var inner = data[i];
  name = inner[3];
  borough = inner[2];
  white = inner[7];
  black = inner[8];
  asian = inner[9];
  other = inner[10]
  hispanic = inner[11];
  var data1 = [
    { label: 'White', value: white * 100 },
    { label: 'Black', value: black * 100 },
    { label: 'Asian', value: asian * 100 },
    { label: 'Other', value: other * 100 },
    { label: 'Hispanic', value: hispanic * 100 },
  ];
  title = name.toString() + ", " + borough.toString();
  createPieChart(data1,title);
  break;
  }
  })};

  getDemographics("/info"); //only does the first one currently

  function createPieChart(data,title) {
    var svg = d3.select("#pie"), 
      width = +svg.attr("width"), 
      height = +svg.attr("height"), 
      radius = Math.min(width, height) / 2;
  
    var g = svg.append("g") //moves the pie chart to the middle of the svg
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    var ordScale = d3.scaleOrdinal()
      .domain(data.map(function(d) { return d.label; })) // 
      .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']); //pie chart colors
  
    var pie = d3.pie()
      .value(function(d) { return d.value; }); 
  
    var arc = g.selectAll("arc")
      .data(pie(data))
      .enter();
  
    var path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
  
    arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return ordScale(d.data.label); }); 
  
    var label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
  
    arc.append("text")
      .attr("transform", function(d) { 
        var pos = label.centroid(d);
        pos[1] += 40; // Adjust the offset of the text as needed
        return "translate(" + pos + ")";
      })
      .text(function(d) { return d.data.label; }) //returns the labels of the data
      // -> design choices: if the pie slice is less than a certain amount, hover the label 
      //
      .style("font-family", "Arial")
      .style("font-size", 15)
    
    
      //title of the chart
      svg.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2) // centers title
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .text(title)
      .style("font-family", "Arial")
      .style("font-size", 20);
  }
  
  

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