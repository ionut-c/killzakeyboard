var Sound = Sound || {};
var temp;
var music;

Sound.SFXConst = {
				shoot: "assets/sound/shoot",
				stats: "assets/sound/postscreen_stats",
				enemy_died: new Array("assets/sound/enemy_died_01","assets/sound/enemy_died_02")
			}
Sound.MusicConst = {
				music1: "assets/sound/thebeat",
			}

Sound.playSFX = function playSFX(soundConst){
    if(Storage.getSoundSettings("sfx") == 1 && Audio !== undefined){
		temp = null;
		temp = new Audio(soundConst+".ogg");
		if(!temp.canPlayType('audio/ogg'))
		{
			temp = new Audio(soundConst+".mp3");
		}
		temp.volume = 0.8;
		temp.play();
    }
}

Sound.playMusic = function playMusic(musicConst){
	console.log("hi");
    if(Storage.getSoundSettings("music") == 1 && Audio !== undefined){
    	music = null;
	    music = new Audio(musicConst+'.ogg');
	    if(!music.canPlayType('audio/ogg'))
		{
			music = new Audio(musicConst+'.mp3');
		}
		music.loop = true;
		music.volume = 0.4;
		music.play();
    }
}
Sound.pauseMusic = function pauseMusic(){
    if (music != undefined) {
		music.pause();
    }
}

Sound.updateMusic = function updateMusic() {
	if(Storage.getSoundSettings("music") == 1){
		music.play();
	}
	else {
		music.pause();
	}
}