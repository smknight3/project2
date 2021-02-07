var apiKey = "1a4e77bf5858f7f032cd526c9b109ad3";
const url = `https://gnews.io/api/v4/search?q=Apple&token=${apiKey}`;

// var word = "";

$(document).ready(function() {
    doWork2();
});

function doWork2() {
    // word = $("#word").val();\
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {
            makeTable(data);
            // makePlot(data);
            // makePlot2(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

datanew = data.totalArticles

function makeTable(datanew) {
    // JQUERY creates an HTML string
    var tbody = $("#ufo-table>tbody");
    //clear table
    // tbody.empty();

    //destroy datatable
    // $("#ufo-table").DataTable().clear().destroy();

    //append data
    datanew.forEach(function(row) {
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