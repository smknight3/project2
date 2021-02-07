var apiKey = "1a4e77bf5858f7f032cd526c9b109ad3";

var word = "";

$(document).ready(function() {
    // doWork2();
    // buildFilters();
    // buildTable();

    //Event Listener
    // $("#word").change(function() {
    //     doWork2();
    // });

    // $("#filter-btn").on("click", function(e) {
    //     e.preventDefault();
    //     buildTable();
    // });

    // $("#filter-clear").on("click", function(e) {
    //     e.preventDefault();
    //     resetFilters();

    // });

    // $("#form").on("submit", function(e) {
    //     e.preventDefault();
    //     buildTable();
    // });

});


function doWork2() {
    word = $("#word").val();
    url = `https://gnews.io/api/v4/search?q=${word}&token=${apiKey}`,

        $.ajax({
            type: "GET",
            url: url,
            success: function(data) {
                console.log(data);
                console.log(data.articles);
                // makePlot(data);
                // makePlot2(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });
}


// function buildFilters() {
//     buildUniqueFilterHelper("totalArticles", "totalArticles");
//     // buildUniqueFilterHelper("title", "title");
//     // buildUniqueFilterHelper("description", "description");
//     // buildUniqueFilterHelper("content", "content");
// }

// function resetFilters() {
//     // $("#datetime").val("");
//     // $("#datetime").text("");
//     $("#totalArticles").val("");
//     // $("#title").val("");
//     // $("#description").val("");
//     // $("#content").val("");
// }

// function buildUniqueFilterHelper(colName, filterID) {
//     var unq_column = [...new Set(data.map(x => x[colName]))];
//     unq_column = unq_column.sort();
//     unq_column.forEach(function(val) {
//         var newOption = `<option>${val.toUpperCase()}</option>`;
//         $(`#${filterID}`).append(newOption);
//     });
// }


// function buildTable() {
// var dateFilter = $("#datetime").val(); //gets input value to filter
// var totalArticlesFilter = $("#totalArticles").val();
//     // var titleFilter = $("#title").val();
//     // var descFilter = $("#description").val();
//     // var contentFilter = $("#content").val();

//     //apply filters
//     var filteredData = data;
//     // if (dateFilter) {
//     //     filteredData = filteredData.filter(row => Date.parse(row.datetime) === Date.parse(dateFilter));
//     // }
//     if (totalArticlesFilter) {
//         filteredData = filteredData.filter(row => row.totalArticles === totalArticlesFilter.toLowerCase());
//     }

//     // if (titleFilter) {
//     //     filteredData = filteredData.filter(row => row.title === titleFilter.toLowerCase());
//     // }
//     // if (descFilter) {
//     //     filteredData = filteredData.filter(row => row.description === descFilter.toLowerCase());
//     // }
//     // if (contentFilter) {
//     //     filteredData = filteredData.filter(row => row.content === contentFilter.toLowerCase());
//     // }

//     // see if we have any data left
//     if (filteredData.length === 0) {
//         alert("No Data Found!");
//     }

//     buildTableString(filteredData);
// }

// function buildTable() {
//     // var dateFilter = $("#datetime").val(); //gets input value to filter
//     var totalArticlesFilter = $("#totalArticles").val();
//     var titleFilter = $("#title").val();
//     // var descFilter = $("#description").val();
//     // var contentFilter = $("#content").val();

//     //apply filters
//     var filteredData = data;
//     // if (dateFilter) {
//     //     filteredData = filteredData.filter(row => Date.parse(row.datetime) === Date.parse(dateFilter));
//     // }
//     if (totalArticlesFilter) {
//         filteredData = filteredData.filter(row => row.totalArticles === totalArticlesFilter.toLowerCase());
//     }

//     // if (titleFilter) {
//     //     filteredData = filteredData.filter(row => row.title === titleFilter.toLowerCase());
//     // }
//     // if (descFilter) {
//     //     filteredData = filteredData.filter(row => row.description === descFilter.toLowerCase());
//     // }
//     // if (contentFilter) {
//     //     filteredData = filteredData.filter(row => row.content === contentFilter.toLowerCase());
//     // }

//     // see if we have any data left
//     if (filteredData.length === 0) {
//         alert("No Data Found!");
//     }

//     buildTableString(filteredData);
// }

function buildTableString(newData) {
    // JQUERY creates an HTML string
    var tbody = $("#ufo-table>tbody");
    //clear table
    tbody.empty();

    //destroy datatable
    $("#ufo-table").DataTable().clear().destroy();

    //append data
    newData.forEach(function(row) {
        var newRow = "<tr>"
            // loop through each Object (dictionary)
        Object.entries(row).forEach(function([key, value]) {
            // set the cell data
            newRow += `<td>${value}</td>`
        });

        //append to table
        newRow += "</tr>";
        tbody.append(newRow);
    });

};

// function makePlot(data) {
//     // var sortedData = data.sort((a, b) => (b.attempted_launches - a.attempted_launches));
//     var names = data.map(x => x.title);
//     var attempts = data.map(x => x.description);
//     var successes = data.map(x => x.content);

//     var trace1 = {
//         x: names,
//         y: attempts,
//         name: 'Attempted Launches',
//         type: 'bar'
//     };

//     var trace2 = {
//         x: names,
//         y: successes,
//         name: 'Successful Launches',
//         type: 'bar'
//     };

//     var data = [trace1, trace2];

//     var layout = { title: "SpaceX Launchpad Success Rates", barmode: 'group' };

//     Plotly.newPlot('plot', data, layout);
// }

//////////////////////////////////////////////////////////////////////////////////