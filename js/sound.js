var gameMusic;
if(Audio !== undefined)
{
var shootSnd = new Audio('assets/shoot.ogg');
}

function shootSound()
{
	if(getSoundSettings(1) === 1 && Audio !== undefined)
	{
		var temp = shootSnd;
		temp.play();
	}
}

function playMusic()
{
	if(getSoundSettings(0) === 1 && Audio !== undefined)
	{
	    gameMusic = new Audio('assets/thebeat.ogg');
		gameMusic.loop = true;
		gameMusic.play();
	}
}