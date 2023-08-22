let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

console.log(sessionStorage.getItem("sidebar-status"))
initialiseSidebar()

closeBtn.addEventListener("click", ()=>{
    console.log('closeBtn click event listener triggered.')
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
});

// following are the code to change sidebar button(optional)

function openSideBar() {
    console.log("Trying to open.");
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    sessionStorage.setItem("sidebar-status", "open");
}

function closeSideBar() {
    console.log("Trying to close.");
    closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
    sessionStorage.setItem("sidebar-status", "closed");
}

function menuBtnChange(){
    console.log("checking sidebar status")
    if (sessionStorage.getItem("sidebar-status") == "open") {
    closeSideBar()
    }
    else {
    openSideBar()
    }
}

function initialiseSidebar(){
    if (sessionStorage.getItem("sidebar-status") == "open"){
    sidebar.classList.toggle("open");
    openSideBar()
    }
    else {
    closeSideBar()
    }
}

function newAnalysis() {
    console.log('Yo start it')
}