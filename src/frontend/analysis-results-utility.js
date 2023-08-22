loader = document.getElementById("loader");
res_table = document.getElementById("results-table-div");
status_text = document.getElementById("status-text");
search_bar = document.getElementById("search-bar");
var s_bar = document.getElementById("search-bar");
var table = document.getElementById("results-table");

// Tasks to be performed when the page loads.
function pageLoad() {

    // Show the loader.
    loader.style="display:block"

    // Start the analysis.
    startAnalysis()

    // Update the page after the scan is done.
    setTimeout(updatePage, 130000)
}

// Hide the loader, show the results table, change the status text, and show the search bar.
function updatePage(){
    loader.style="display:none"
    res_table.style="display:block"
    status_text.innerHTML = "The following transactions have been flagged as fraudulent: "
    search_bar.style="display:block"
}

// Show the page. 
function showPage() {
    window.location.href = "analysis-results.html";
}

// Start the analysis.
async function startAnalysis(){

    var x;
    const res = await fetch('http://localhost:5000/analysis')
        .then(function (response){
            return response.json();

        }).then(function (data) {
            x = data
        })
    
    // Now we have the data, we can fill the HTML page.
    fillData(x)
};

// Dynamically filling the data...
function fillData(results){
    
    // Storing the results in an array.
    let sortable = [];
    for(var key in results){
        sortable.push([key, results[key]])
    }

    // Sort the array.
    sortable.sort(function(a, b){
        return a[1] - b[1];
    })

    // Counter variable which stores where to insert the next table row.
    counter = 0

    for(var key in results){          

        // If the transaction is fraudulent...
        if (results[key][0] == 1){

            // Make a new row.
            var row = table.insertRow(counter);

            // Populate it with data.
            var i = 0
            while (i < 5){
                var cell = row.insertCell(i)
                cell.innerHTML = results[key][1][i]
                
                i += 1
            }

            counter += 1;
        }
    }

    var row = table.insertRow(0)

    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)
    var cell5 = row.insertCell(4)

    cell1.innerHTML = "<b>ID</b>"
    cell2.innerHTML = "<b>Forename</b>"
    cell3.innerHTML = "<b>Surname</b>"
    cell4.innerHTML = "<b>Location</b>"
    cell5.innerHTML = "<b>Amount</b>"
}

// Our function to update the table, based on the search bar's input.
// Every time a keystroke is detected in the search bar, this function is called.

function updateResults(){
    
    tr = res_table.getElementsByTagName("tr");
    filter = s_bar.value.toUpperCase();

    for (i = 1; i < tr.length; i++){

        td = tr[i].getElementsByTagName("td")

        td1 = td[0];
        td2 = td[1];
        td3 = td[2];  // These cannot be in an array.
        td4 = td[3];
        td5 = td[4];

        if (td) {

            txtValue1 = (td1.textContent || td1.innerText)
            txtValue2 = (td2.textContent || td2.innerText) 
            txtValue3 = (td3.textContent || td3.innerText)
            txtValue4 = (td4.textContent || td4.innerText)
            txtValue5 = (td5.textContent || td5.innerText)
            
            if ((txtValue1.toUpperCase().indexOf(filter) > -1) || (txtValue2.toUpperCase().indexOf(filter) > -1) || (txtValue3.toUpperCase().indexOf(filter) > -1) || (txtValue4.toUpperCase().indexOf(filter) > -1) || (txtValue5.toUpperCase().indexOf(filter) > -1)){
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}