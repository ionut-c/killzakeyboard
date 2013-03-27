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

// runs the game loop
window.onresize = function(event) {
    document.getElementById("canvas").style.transform="scale(0.5,0.5)";
}
function gameLoop(time){
    if (prev != 0) {
        deltaTime = time - prev;
    }
    prev = time;

    draw.call(this, deltaTime);
    process.call(this, deltaTime);

    if ( this.level.isOver() ){
	document.getElementById("canvas").style.display = "none";
	showTitleScreen();
	console.log("ended");
	levelCompleted(this.level.getId(),this.level.getCompletion());
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

function init(level) {
    prev = 0;
    deltaTime = 0;
    var canvas, context;
    canvas = document.getElementById("canvas");
    canvas.width = 1024;
    canvas.height = 576;

    context = canvas.getContext("2d");

    level = getLevel( level, canvas, context );

    var player = new Player(20, canvas.height / 2, context, canvas.width, canvas.height);
    var background = new Background(context, "assets/background.png", 2048, 576, 1024, 576);
    var input = InputController();
    var extension = {"background": background,"input": input, "player": player, "canvas": canvas, "context": context, 'level': level };
    //console.profile();
    requestAnimationFrame(gameLoop.bind(extension));
}
