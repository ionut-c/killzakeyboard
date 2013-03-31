function showLevelSelect() {
    document.getElementById("Levels").innerHTML = "";
    document.getElementById("WrapsTitle").style.display = "none";
    document.getElementById("WrapsLevels").style.display = "block";
    var wrapsLevels = document.getElementById("WrapsLevels");
    var levels = Array();
    for (i = 1; i <= 5; i++) {
    	var completion = getLevelCompletion(i);
	var unlocked = isLevelUnlocked(i);
    	levels.push({ "order": i, "unlocked": unlocked, "completed": completion })
    }
    var levelRow;
    for (i = 0; i < levels.length; i++) {
        if (i % 6 == 0) {
            var levelRow = document.createElement("li")
            document.getElementById("Levels").appendChild(levelRow);
        }
        var level = document.createElement("a");
        levelRow.appendChild(level);
        if (levels[i].unlocked == 0) {
            level.setAttribute("class", "level disabled");
        }
        else {
            if (levels[i].completed == 0) {
                level.setAttribute("class", "level");
            }
            else {
                level.setAttribute("class", "level completed"+levels[i].completed);
            }
            level.onclick = (function (index){
		return function () {
		    	document.getElementById("canvas").style.display = "block";
                        clearUI();
                        init(index);};
                })(i+1);
        }
        level.innerHTML = levels[i].order;
    }
}
function clearUI() {
    document.getElementById("Levels").innerHTML = "";
    document.getElementById("WrapsLevels").style.display = "none";
    document.getElementById("WrapsSettings").style.display = "none";
    document.getElementById("WrapsTitle").style.display = "none";
    document.getElementById("WrapsPostScreen").style.display = "none";
}
function showTitleScreen() {
    clearUI();
    document.getElementById("WrapsTitle").style.display = "block";
}
function showSettings() {
    clearUI()
    document.getElementById("WrapsSettings").style.display = "block";
    document.getElementById("Reset").setAttribute("class","title-button");
    if(getSoundSettings(0) === 0)
    {
        document.getElementById("ToggleMusic").innerHTML = "Music is Off";
    }
    else {
        document.getElementById("ToggleMusic").innerHTML = "Music is On";
    }
    if(getSoundSettings(1) === 0)
    {
        document.getElementById("ToggleSFX").innerHTML = "SFX is Off";
    }
    else {
        document.getElementById("ToggleSFX").innerHTML = "SFX is On";
    }
}
function showPostScreen() {
    clearUI();
    devResetStats();
    document.getElementById("WrapsPostScreen").style.display = "block";
    setTimeout(function(){showStats()},200);
}
function showStats(){
    document.getElementById("PostScreenTest").setAttribute("onclick","devResetStats();");
    document.getElementById("PostScreenTest").innerHTML = "RESET";
    animateStats("KilledStats");
    setTimeout(function(){animateStats("MissedStats")},400);
    setTimeout(function(){animateStats("Conclusion")},800);
} 
function animateStats(statsId)
{
    setTimeout(function(){playSFX(statsSnd);},300);
    document.getElementById(statsId).className = "stats-box show";
    document.getElementById(statsId).style.bottom = ""+(550 - 75 * parseInt(document.getElementById(statsId).getAttribute("data-order")) || 1) + "px";
}
function devResetStats(){
    document.getElementById("PostScreenTest").setAttribute("onclick","showStats();");
    document.getElementById("PostScreenTest").innerHTML = "End Level";
    document.getElementById("KilledStats").style.bottom = "-35px";
    document.getElementById("KilledStats").className = "stats-box";
    document.getElementById("MissedStats").style.bottom = "-35px";
    document.getElementById("MissedStats").className = "stats-box";
    document.getElementById("Conclusion").style.bottom = "-35px";
    document.getElementById("Conclusion").className = "stats-box";
}  