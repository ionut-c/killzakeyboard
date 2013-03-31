var gameMusic;

var shootSnd = "assets/shoot";
var statsSnd = "assets/postscreen_stats";
var temp;

function playSFX(sound)
{
	if(getSoundSettings(1) === 1 && Audio !== undefined)
	{
		temp = null;
		temp = new Audio(sound+".ogg");
		if(!temp.canPlayType('audio/ogg'))
		{
			temp = new Audio(sound+".mp3");
		}
		temp.volume = 0.8;
		temp.play();
	}
}

function playMusic()
{
	if(getSoundSettings(0) === 1 && Audio !== undefined)
	{
	    gameMusic = new Audio('assets/thebeat.ogg');
	    if(!gameMusic.canPlayType('audio/ogg'))
		{
			gameMusic = new Audio('assets/thebeat.mp3');
		}
		gameMusic.loop = true;
		gameMusic.volume = 0.6;
		gameMusic.play();
	}
}