var Hud = Hud || {};

Hud.refreshHUD = function refreshHUD(currentFill) {
    if(player.getY() > (gameHeight - 61 - player.getHeight()))
    {
        document.getElementById("ProgressBar").style.opacity = "0.3";
    }
    else
    {
        document.getElementById("ProgressBar").style.opacity = "1";
    }

    if(player.getY() < 76 && player.getX() < 215)
    {
        document.getElementById("WeaponHolder").style.opacity = "0.3";
    }
    else
    {
        document.getElementById("WeaponHolder").style.opacity = "1";
    }

    if(player.getY() < 76 && player.getX() < 330 && player.getX() > 20)
    {
        document.getElementById("MissedEnemies").style.opacity = "0.3";
    }
    else
    {
        document.getElementById("MissedEnemies").style.opacity = "1";
    }

    document.getElementById("ProgressFill").style.width = currentFill+"%";
}