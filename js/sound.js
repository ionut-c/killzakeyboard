var Sound = Sound || {};

var Music;

if(Audio !== undefined)
{
var shootSnd = new Audio('assets/shoot.ogg');
}

Sound.shoot = function shootSound(){
    if(Cookies.getSoundSettings("sfx") == 1 && Audio !== undefined){
	var temp = shootSnd;
	temp.play();
    }
}

Sound.playMusic = function playMusic(){
    if(Cookies.getSoundSettings("music") == 1 && Audio !== undefined){
	Music = new Audio('assets/thebeat.ogg');
	Music.loop = true;
	Music.play();
    }
}
Sound.pauseMusic = function pauseMusic(){
    if (Music != undefined) {
	Music.pause();
    }
}