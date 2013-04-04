(function () {
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var start = window.animationStartTime;

deltaTime = 0;
prev = 0;
var fullpage = true;
var sx = 1, sy = 1;
var gameWidth = 1920;
var gameHeight = 1080;

var paused = false;
var prev_state = false;

function updatePause( context, canvas, value ) {
    if ( prev_state == false && value == true ) {
	paused = !paused;
	showPauseMenu();
	context.save();
	context.fillStyle = "rgba( 0, 0, 0, 0.2)"; 
	context.fillRect(0, 0, canvas.width, canvas.height );
	context.restore();
    }
    if( !paused ){
	clearUI();
    }
    prev_state = value;

}

window.onresize = function(event) {
    scale();
}
window.onload = function(event) {
    scale();
}
function scale() {
    var tx = 0;
    if(fullpage){
        var h = window.innerHeight;
        var w = (h * 16) / 9;
        if(window.innerWidth < w)
        {
            w = window.innerWidth;
            h = (w * 9) / 16;
        }
        sx = w / gameWidth;
        sy = h / gameHeight;
        
        d1 = (gameWidth - w) / 2;
        d2 = window.innerWidth - d1 - w;
        d3 = Math.max(0, window.innerWidth - gameWidth);
        tx = (d1 - d2 + d3) / 2;
    }
    document.getElementById("GameHolder").style.transform="translate(-"+tx+"px) scale("+sx+","+sy+")";
    document.getElementById("GameHolder").style.webkitTransform="translate(-"+tx+"px) scale("+sx+","+sy+")";
    document.getElementById("GameHolder").style.OTransform="translate(-"+tx+"px) scale("+sx+","+sy+")";
    document.getElementById("GameHolder").style.msTransform="translate(-"+tx+"px) scale("+sx+","+sy+")";
    document.getElementById("GameHolder").style.MozTransform="translate(-"+tx+"px) scale("+sx+","+sy+")";
}
// runs the game loop
function gameLoop(time){
    if (prev != 0) {
        deltaTime = time - prev;
    }
    prev = time;
    //console.log( this.input.checkKey(27) );
    updatePause( this.context, this.canvas, this.input.checkKey(27) );

    if ( !paused ) {
	draw.call(this, deltaTime);
	process.call(this, deltaTime);
    }

    if ( this.level.isOver() ){
	document.getElementById("canvas").style.display = "none";
	document.getElementById("ProgressBar").style.display = "none";
	showScoreScreen();
	Sound.pauseMusic();
        Cookies.setLevelCompletion(this.level.getId(),this.level.getCompletion());
    } else {
	requestAnimationFrame(gameLoop.bind(this));
    }
}
// processing done for game logic
function process(deltaTime){
    var apple = this.player.update(this.input, deltaTime);
    if( apple != null){
        this.level.getEntityManager().addCollider(apple);
    }
    this.level.update(deltaTime);
    this.background.update(deltaTime);
}
// rendering frame
function draw(time) {
    var path = this.path;
    var context = this.context;
    
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.render();
    this.level.render();
    this.player.render();
}
var player;
function init(level) {
    Sound.playMusic(Sound.MusicConst.music1);
    prev = 0;
    totalEnemies = 0;
    deltaTime = 0;
    scale();
    var canvas, context;
    canvas = document.getElementById("canvas");

    canvas.width = gameWidth;
    canvas.height = gameHeight;
    
    context = canvas.getContext("2d");

    level = getLevel( level, canvas, context );

    player = new Player(20, canvas.height / 2, context, canvas.width, canvas.height);
    Hud.refreshProgressBar(0);
    document.getElementById("ProgressBar").style.display = "block";
    var background = new Background(context, "assets/background.png", 3840, 1080, canvas.width, canvas.height);
    var input = InputController();
    var extension = {"background": background,"input": input, "player": player, "canvas": canvas, "context": context, 'level': level };
    //console.profile();
    requestAnimationFrame(gameLoop.bind(extension));
}
