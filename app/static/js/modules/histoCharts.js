// Load the Visualization API and the corechart package.
google.charts.load("current", {packages:["corechart"]});

var getpIndex = function() {
    fetch("/info").then(res => res.json()).then(data => {
    var input = [];
    input.push(['Neighborhood', 'Poverty Index']);
    for (let i = 0; i < data.length; i++) {
        var inner = data[i];
        var name = inner[3];
        var borough = inner[2];
        var pindex = inner[5];
        var medianIncome = inner[6];
        input.push([name + ", " + borough, pindex]);
    }
    //console.log(input);
    drawHistoforIndex(input);
    });
  };


  var getIncome = function() {
    fetch("/info").then(res => res.json()).then(data => {
    var input = [];
    input.push(['Neighborhood', 'Median Income']);
    for (let i = 0; i < data.length; i++) {
        var inner = data[i];
        var name = inner[3];
        var borough = inner[2];
        var medianIncome = inner[6];
        input.push([name + ", " + borough, medianIncome]);
    }
    //console.log(input);
    drawHistoforIncome(input);
    });
  };

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(getpIndex);
google.charts.setOnLoadCallback(getIncome);

function drawHistoforIndex(input) {
    var data = google.visualization.arrayToDataTable(input);
  
    var options = {
        title: 'Poverty Index of Selected Neighborhoods in NYC',
        legend: { position: 'none' }
      };

    var chart = new google.visualization.Histogram(document.getElementById('histo_div'));
    chart.draw(data, options);
}

function drawHistoforIncome(input) {
    var data = google.visualization.arrayToDataTable(input);
  
    var options = {
        title: 'Median Incomes of Selected Neighborhoods in NYC',
        legend: { position: 'none' },
        vAxis: { scaleType: 'mirrorLog' }
      };

    var chart = new google.visualization.Histogram(document.getElementById('histo2_div'));
    chart.draw(data, options);
}

