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
mousex = 0;
mousey = 0;

function backToMenu(){

}

// runs the game loop
function gameLoop(time){
    if (prev != 0) {
        deltaTime = time - prev;
    }
    prev = time;
    
    draw.call(this, deltaTime);
    process.call(this, deltaTime);

    if( this.level.isOver() ){
	return;
    }
    requestAnimationFrame(gameLoop.bind(this));
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

var fullpage = false;
var sx, sy;
function init( level ) {
    var canvas, context;
    canvas = document.getElementById("canvas");
    canvas.width = 1024;
    canvas.height = 576;
    if(fullpage){
        var h = window.innerHeight - 0;
        var w = (h * 16) / 9;
        sx = w / canvas.width;
        sy = h / canvas.height;
        canvas.width = w;
        canvas.height = h;
    } else {
        sx = 1;
        sy = 1;
    }
    context = canvas.getContext("2d");
    context.scale(sx, sy);

    var player = new Player(20, canvas.height / 2, context, canvas.width, canvas.height);
    var background = new Background(context, "assets/background.png", 2048, 576, 1024, 576);
    var level = loadLevelByName(level, canvas, context);
    var input = InputController();
    var extension = {"background": background,"input": input, "player": player, "canvas": canvas, "context": context, 'level': level };
    //console.profile();
    requestAnimationFrame(gameLoop.bind(extension));
}
