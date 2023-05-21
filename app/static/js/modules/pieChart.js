// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

var getDemographics = function(){
    //console.log(data);
    name = data[0][3];
    borough = data[0][2];
    white = data[0][7];
    black = data[0][8];
    asian = data[0][9];
    other = data[0][10]
    hispanic = data[0][11];
    var data1 = [
      ["White",white * 100 ],
      ["Black",black * 100 ],
      ["Asian",asian * 100 ],
      ["Other",other * 100 ],
      ["Hispanic",hispanic * 100],
    ];
    console.log(data1);
    title = name.toString() + ", " + borough.toString();
    console.log(title);
    drawChart(data1,title);
    };

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(getDemographics);

function drawChart(input,title) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Racial Group');
    data.addColumn('number', 'Percentage of Residents');
    data.addRows(input);

    // Set chart options
    var options = {'title':title,
                'width':1000,
                'height':900,
                 pieHole: 0.4};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}