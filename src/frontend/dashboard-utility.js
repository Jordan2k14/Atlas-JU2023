let introPara = document.getElementById("intro-para");
let parent = document.getElementById("intro-text");
const node = document.createElement("p");
const node2 = document.createElement("br");

const textnode = document.createTextNode("You can gain an insight into how Atlas works through the 'Analytics' tab on your left.");

node.appendChild(node2)
node.appendChild(textnode)

let t1 = true

function changeText() {
    setInterval(changeIt, 7000)
}

function changeIt() {
    if (t1) {
        parent.removeChild(introPara);
        parent.appendChild(node)
        t1 = false
    }

    else {
        parent.removeChild(node);
        parent.appendChild(introPara);
        t1 = true
    }
}