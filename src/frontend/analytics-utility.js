let notebookButton = document.querySelector("#notebook-button");
let observationsButton = document.querySelector("#observations-button")
let terminologyButton = document.querySelector("#terminology-button")
let nonSmoteButton = document.querySelector("#training-without-smote-button")
let smoteButton = document.querySelector("#training-with-smote-button")
let bestModelButton = document.querySelector("#best-model-button")
let classificationButton = document.querySelector("#classification-button")
let dataPreprocessingButton = document.querySelector("#data-preprocessing-button")
let aboutDatasetButton = document.querySelector("#about-the-dataset-button")

notebookButton.addEventListener("click", ()=>{
    console.log('notebook button click event listener triggered. Trying to open notebook.')
    changePageNotebook();
});

observationsButton.addEventListener("click", ()=> {
    console.log('observations button click event listener triggred. Trying to open observations.')
    changePageObservations();
})

terminologyButton.addEventListener("click", () => {
    changeTerminology();
})

nonSmoteButton.addEventListener("click", () => {
    changeNonSmote();
})

smoteButton.addEventListener("click", () => {
    changeSmote();
})

bestModelButton.addEventListener("click", () => {
    changeBestModel();
})

classificationButton.addEventListener("click", () => {
    changeClassification();
})

dataPreprocessingButton.addEventListener("click", () => {
    changeDataPreprocessing();
})

aboutDatasetButton.addEventListener("click", () => {
    changeAboutDataset();
})

// ----------------------

function changePageNotebook() {
    window.location.href ="notebook-frame.html";
}

function changePageObservations() {
    window.location.href = "observations-frame.html";
}

function changeTerminology(){
    window.location.href = "terminology-frame.html"
}

function changeNonSmote() {
    window.location.href = "non-smote-frame.html"
}

function changeSmote() {
    window.location.href = "smote-frame.html"
}

function changeBestModel() {
    window.location.href = "best-model-frame.html"
}

function changeClassification() {
    window.location.href = "classification-frame.html"
}

function changeDataPreprocessing() {
    window.location.href = "data-preprocessing-frame.html"
}

function changeAboutDataset() {
    window.location.href = "about-dataset-frame.html"
}