var gameMusic;
var shootSnd = new Audio('assets/shoot.ogg');

function shootSound()
{
	temp = shootSnd;
	temp.play();
}

function playMusic()
{
    gameMusic = new Audio('assets/thebeat.ogg');
	gameMusic.loop = true;
	gameMusic.play();
}