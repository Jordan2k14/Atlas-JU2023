let startButton = document.querySelector("#start-analysis-button");
let resultsDiv = document.querySelector('#results-div');

startButton.addEventListener("click", ()=>{
    console.log('start analysis button click event listener triggered.')
    changePage()
});

function changePage() {
    window.location.href = "analysis-results.html";
}

