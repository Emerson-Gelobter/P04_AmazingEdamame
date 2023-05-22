// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['table']});

var getpIndexandIncome = function() {
    fetch("/info").then(res => res.json()).then(data => {
    var input = [];
    for (let i = 0; i < data.length; i++) {
        var inner = data[i];
        var name = inner[3];
        var borough = inner[2];
        var pindex = inner[5];
        var medianIncome = inner[6];
        //console.log(borough, name, pindex, medianIncome);
        input.push([name + ", " + borough, { v: pindex, f: pindex.toString() }, { v: medianIncome, f: "$" + medianIncome.toString() }]);
    }
    //console.log(input);
    drawTable(input);
    });
  };

// getpIndexandIncome();
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(getpIndexandIncome);

function drawTable(input) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Neighborhood');
    data.addColumn('number', 'Poverty Index');
    data.addColumn('number', 'Median Income');
    data.addRows(input);
  
    var table = new google.visualization.Table(document.getElementById('table_div'));
  
    table.draw(data, {showRowNumber: true, width: 800, height: 700});
}