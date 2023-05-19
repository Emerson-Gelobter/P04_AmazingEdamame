var map = L.map('map').setView([40.730610, -73.935242], 10); //coordinates of new york
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var layerGroup = L.layerGroup().addTo(map);

function makeCircles(x,y,z1,z2){
  var circle = L.circle([x,y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
  }).addTo(layerGroup);
  circle.bindPopup(z1.toString() + "," + z2.toString());
}

function makeFinancialCircles(x,y,z1,z2){
  var circle = L.circle([x,y], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
  }).addTo(layerGroup);
  circle.bindPopup(z1.toString() + "," + z2.toString());
}

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(layerGroup);
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
  makeFinancialCircles(latitude,longitude,name,borough);
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


function getSelectedValue() {
  var radios = document.getElementsByName("flexRadioDefault");
  var selectedValue;

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedValue = radios[i].value;
      break;
    }
  }
  if (selectedValue == "neighborhoods"){
    getData('/neighborsMap');
  } else if  (selectedValue == "financials"){
    getDemographics('/info');
  }
}

function clear(){
  layerGroup.clearLayers();
}

// Attach event listener to the radio buttons
var radios = document.getElementsByName("flexRadioDefault");
for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", clear);
  radios[i].addEventListener("change", getSelectedValue);
}