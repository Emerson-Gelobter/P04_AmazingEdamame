var map = L.map('map').setView([40.730610, -73.935242], 10); //coordinates of new york
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function makeCircles(x,y,z1,z2){
  var circle = L.circle([x,y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
  }).addTo(map);
  circle.bindPopup(z1.toString() + "," + z2.toString());
}

function makeBlueCircles(x,y,z1,z2){
  var circle = L.circle([x,y], {
    color: 'blue',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
  }).addTo(map);
  circle.bindPopup(z1.toString() + "," + z2.toString());
}

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

var getDemographics = function(e){
  fetch(e).then(res => res.json()).then(data => {
  for (let i=0; i<data.length;i++){
  var inner = data[i];
  name = inner[3];
  borough = inner[2];
  latitude = inner[12];
  longitude = inner[13];
  makeBlueCircles(latitude,longitude,name,borough);
  }
  })};

var getData = function(e){
fetch(e).then(res => res.json()).then(data => {
for (i=0; i<data.length;i++){
  var inner = data[i];
  lat = inner[0];
  long = inner[1];
  name = inner[2];
  borough = inner[3];
  makeCircles(lat,long,name,borough);
}
})};

getData('/neighborsMap');
getDemographics('/info')
