//import * as d3 from "d3";
import * as d3 from 'https://unpkg.com/d3?module'
function sales(data){
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

// chart1  = {
//   const context = DOM.context2d(width, height);
//   const path = d3.geoPath(projection, context);
  
//   function render(land) {
//     context.clearRect(0, 0, width, height);
//     context.beginPath(), path(sphere), context.fillStyle = "#fff", context.fill();
//     context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
//     context.beginPath(), path(sphere), context.stroke();
//   }
  
//     return d3.select(context.canvas)
//       .call(drag(projection)
//           .on("drag.render", () => render(land110))
//           .on("end.render", () => render(land50)))
//       .call(() => render(land50))
//       .node();
//   }

  function drag(projection) {
    let v0, q0, r0;
    
    function dragstarted() {
      v0 = versor.cartesian(projection.invert([d3.event.x, d3.event.y]));
      q0 = versor(r0 = projection.rotate());
    }
    
    function dragged() {
      const v1 = versor.cartesian(projection.rotate(r0).invert([d3.event.x, d3.event.y]));
      const q1 = versor.multiply(q0, versor.delta(v0, v1));
      projection.rotate(versor.rotation(q1));
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged);
  }

 // projection = d3[projectionName]().precision(0.1)

  // height = {
  //   const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
  //   const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  //   projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  //   return dy;
  // }

  // sphere = ({type: "Sphere"})
  
  // land50 = Object {type: "FeatureCollection", features: Array(1)}
  // land110 = Object {type: "FeatureCollection", features: Array(1)}
  // versor = ƒ(t)
  // topojson = Object {bbox: ƒ(e), feature: ƒ(e, t), merge: ƒ(e), mergeArcs: ƒ(e, t), mesh: ƒ(e), meshArcs: ƒ(e, t, r), neighbors: ƒ(e), quantize: ƒ(e, t), transform: ƒ(e), untransform: ƒ(e)}
  // d3 = Object {event: null, format: ƒ(t), formatPrefix: ƒ(t, n), timeFormat: ƒ(t), timeParse: ƒ(t), utcFormat: ƒ(t), utcParse: ƒ(t), FormatSpecifier: ƒ(t), active: ƒ(t, n), arc: ƒ(), area: ƒ(), areaRadial: ƒ(), ascending: ƒ(t, n), autoType: ƒ(t), axisBottom: ƒ(t), axisLeft: ƒ(t), axisRight: ƒ(t), axisTop: ƒ(t), bisect: ƒ(n, e, r, i), bisectLeft: ƒ(n, e, r, i), …}
  
