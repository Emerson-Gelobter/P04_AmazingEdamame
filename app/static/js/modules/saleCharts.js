// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['table']});

var getSales = function() {
    var input = [];
    for (let i = 0; i < data.length; i++) {
        var inner = data[i];
        var name = inner[1] + ", " + inner[0];
        var typeDwelling = inner[2];
        var salesAmt = inner[3];
        var lowest = inner[4];
        var average = inner[5];
        var median = inner[6];
        var highest = inner[7];
        input.push([name, typeDwelling, { v: salesAmt, f: salesAmt.toString() }, { v: lowest, f: lowest.toString() }, { v: average, f: "$" + average.toString()}, { v: median, f: "$" + median.toString()}, { v: highest, f: "$" + highest.toString()}]);
    }
    drawTable(input);
    };

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(getSales);

function drawTable(input) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Neighborhood');
    data.addColumn('string', 'Type of House');
    data.addColumn('number', 'Number of Sales');
    data.addColumn('number', 'Lowest Price Sold');
    data.addColumn('number', 'Average Price Sold');
    data.addColumn('number', 'Median Price Sold');
    data.addColumn('number', 'Highest Price Sold');
    data.addRows(input);
  
    var table = new google.visualization.Table(document.getElementById('table_div'));

    var numRows = data.getNumberOfRows();
    var numColumns = data.getNumberOfColumns();
    var tableWidth = (numColumns + 1) * 150;
    var tableHeight = (numRows + 1) * 30; 
  
    table.draw(data, {showRowNumber: true, width: tableWidth, height: tableHeight});
}