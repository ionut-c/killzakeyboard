var Hud = Hud || {};

Hud.refreshProgressBar = function refreshProgressBar(currentFill){
    if(player.getY() > (gameHeight - 56 - player.getHeight())){
        document.getElementById("ProgressBar").style.opacity = "0.3";
    } else {
        document.getElementById("ProgressBar").style.opacity = "1";
    }
    document.getElementById("ProgressFill").style.width = currentFill+"%";
}