var gameMusic;
var shootSnd = new Audio('assets/shoot.ogg');

function shootSound()
{
	if(getSoundSettings(1) === 1)
	{
		var temp = shootSnd;
		temp.play();
	}
}

function playMusic()
{
	if(getSoundSettings(0) === 1)
	{
	    gameMusic = new Audio('assets/thebeat.ogg');
		gameMusic.loop = true;
		gameMusic.play();
	}
}