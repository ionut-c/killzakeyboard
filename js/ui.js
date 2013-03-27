function showLevelSelect() {
    document.getElementById("Levels").innerHTML = "";
    document.getElementById("WrapsTitle").style.display = "none";
    document.getElementById("WrapsLevels").style.display = "block";
    var wrapsLevels = document.getElementById("WrapsLevels");
    var levels = Array({ order: 1, title: "Wonders of Juliana", unlocked: true, completed: 3 },
                       { order: 2, title: "Augustus from Skyia", unlocked: true, completed: 1 },
                       { order: 3, title: "Septin 7", unlocked: true, completed: 2 },
                       { order: 4, title: "Octavius Trives", unlocked: true, completed: 0 },
                       { order: 5, title: "Freedom Nova", unlocked: false, completed: 0 },
                       { order: 6, title: "Decimal Fight", unlocked: false, completed: 0 },
                       { order: 7, title: "Jane Jordinson", unlocked: false, completed: 0 },
                       { order: 8, title: "Fiona fights back", unlocked: false, completed: 0 },
                       { order: 9, title: "Mark Twelve", unlocked: false, completed: 0 },
                       { order: 10, title: "Fall of Aprilla", unlocked: false, completed: 0 },
                       { order: 11, title: "Mayem on Skyia", unlocked: false, completed: 0 },
                       { order: 12, title: "The sins of Junice", unlocked: false, completed: 0 }
                      );
    var levelRow;
    for (i = 0; i < levels.length; i++) {
        if (i % 4 == 0) {
            var levelRow = document.createElement("li")
            document.getElementById("Levels").appendChild(levelRow);
        }
        var level = document.createElement("a");
        levelRow.appendChild(level);
        if (levels[i].unlocked === false) {
            level.setAttribute("class", "level disabled");
        }
        else {
            if (levels[i].completed === 0) {
                level.setAttribute("class", "level");
            }
            else {
                level.setAttribute("class", "level completed"+levels[i].completed);
            }
            level.onclick = function () {
                    clearUI();
                    init();
                };
        }
        level.innerHTML = levels[i].order;
    }
}
function clearUI() {
    document.getElementById("Levels").innerHTML = "";
    document.getElementById("WrapsLevels").style.display = "none";
}
function showTitleScreen() {
    document.getElementById("WrapsTitle").style.display = "block";
    document.getElementById("WrapsSettings").style.display = "none";
    document.getElementById("WrapsLevels").style.display = "none";
}
function showSettings() {
    document.getElementById("WrapsTitle").style.display = "none";
    document.getElementById("WrapsSettings").style.display = "block";
}
