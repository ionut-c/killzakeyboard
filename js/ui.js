function showLevelSelect() {
    document.getElementById("Levels").innerHTML = "";
    document.getElementById("WrapsTitle").style.display = "none";
    document.getElementById("WrapsLevels").style.display = "block";
    var wrapsLevels = document.getElementById("WrapsLevels");
    var levels = Array({ name: "1 - Wonders of Juliana", unlocked: true, completed: true },
                       { name: "2 - Augustus from Skyia", unlocked: true, completed: true },
                       { name: "3 - Septin 7", unlocked: true, completed: false },
                       { name: "4 - Octavius Trives", unlocked: false, completed: false },
                       { name: "5 - Freedom Nova", unlocked: false, completed: false },
                       { name: "6 - Decimal Fight", unlocked: false, completed: false },
                       { name: "7 - Jane Jordinson", unlocked: false, completed: false },
                       { name: "8 - Fiona fights back", unlocked: false, completed: false },
                       { name: "9 - Mark Twelve", unlocked: false, completed: false },
                       { name: "10 - Fall of Aprilla", unlocked: false, completed: false },
                       { name: "11 - Mayem on Skyia", unlocked: false, completed: false },
                       { name: "12 - The sins of Junice", unlocked: false, completed: false }
                      );
    var levelRow;
    for (i = 0; i < levels.length; i++) {
        if (i % 3 == 0) {
            var levelRow = document.createElement("li")
            document.getElementById("Levels").appendChild(levelRow);
        }
        var level = document.createElement("a");
        levelRow.appendChild(level);
        if (levels[i].unlocked === false) {
            level.setAttribute("class", "level disabled");
        }
        else {
            if (levels[i].completed === false) {
                level.setAttribute("class", "level");
            }
            else {
                level.setAttribute("class", "level completed");
            }
            level.onclick = function () {
                    clearUI();
                    init();
                };
        }
        level.innerHTML = levels[i].name;
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
