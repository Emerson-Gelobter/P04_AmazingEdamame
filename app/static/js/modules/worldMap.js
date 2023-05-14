var map = L.map('map').setView([40.730610, -73.935242], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var circle = L.circle([40.6093777011377,-73.948415153289], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);

// var popup = L.popup()
// .setLatLng([40.6093777011377,-73.948415153289])
// .setContent("Madison, Brooklyn")
// .addTo(map);

circle.bindPopup("Madison, Brooklyn");

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


var getData = function(e) {
  fetch(e).then(res => res.json()).then(data => {
    for (var i = 0; i < data.length; i++) {
      var innerList = data[i];
      console.log(innerList);

      for (var j = 0; j < 4; j++) {
        var element = innerList[j];
        
        console.log(element);
      }
    }
  })};

var x = getData('/neighborsMap');


// var getData = function(e){
// fetch(e).then(res => res.text()).then(data => {
// // Printing that data to a div in HTML
// //document.getElementById('received').innerText = data;
// console.log(data);
// })};
