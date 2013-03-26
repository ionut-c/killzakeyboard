var debug = false;

addEventListener("keydown", function () {
    if ((inputController.checkKey(68))) {
        toggleDebug();
        delete inputController.keysDown[68];
    }
}, false);

function toggleDebug() {
    if (debugFlag == true) {
        debugFlag = false;
        document.getElementById("debug-panel").style.display = "none";
    }
    else {
        debugFlag = true;
        document.getElementById("debug-panel").style.display = "block";
    }
}
var console = function (message, id) {
    var tempElement = document.getElementById(id);
    if (tempElement == null) {
        tempElement = document.createElement("div");
        tempElement.id = id;
        document.getElementById("debug-panel").appendChild(tempElement);
        document.getElementById(id).innerHTML = message;
    }
    else {
        document.getElementById(id).innerHTML = message;
    }
}
console.log = function (message) {
    var tempElement = document.createElement("div");
        tempElement.innerHTML = message;
        document.getElementById("debug-panel").appendChild(tempElement);
}