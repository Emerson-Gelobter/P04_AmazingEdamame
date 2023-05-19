// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

var getDemographics = function(e){
    fetch(e).then(res => res.json()).then(data => {
    for (let i=0; i<data.length;i++){
    var inner = data[i];
    console.log(inner);
    name = inner[3];
    borough = inner[2];
    white = inner[7];
    black = inner[8];
    asian = inner[9];
    other = inner[10]
    hispanic = inner[11];
    var data1 = [
      ["White",white * 100 ],
      ["Black",black * 100 ],
      ["Asian",asian * 100 ],
      ["Other",other * 100 ],
      ["Hispanic",hispanic * 100],
    ];
    console.log(data1);
    title = name.toString() + ", " + borough.toString();
    drawChart(data1,title);
    break;
    }
    })};

getDemographics("/info");

function drawChart(input,title) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Racial Group');
    data.addColumn('number', 'Percentage of Residents');
    data.addRows(input);

    // Set chart options
    var options = {'title':title,
                'width':400,
                'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}