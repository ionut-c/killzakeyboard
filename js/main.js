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

// runs the game loop
window.onresize = function(event) {
    scale();
}
function gameLoop(time){
    if (prev != 0) {
        deltaTime = time - prev;
    }
    prev = time;
    
    draw.call(this, deltaTime);
    process.call(this, deltaTime);
    
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

var fullpage = true;
var sx = 1, sy = 1;
var canvasWidth = 1024;
var canvasHeight = 576;
function scale() {
    if(fullpage){
        var tx = 0;
        var h = window.innerHeight;
        var w = (h * 16) / 9;
        if(window.innerWidth < w)
        {
            w = window.innerWidth;
            h = (w * 9) / 16;
        }
        sx = w / canvasWidth;
        sy = h / canvasHeight;
        
        d1 = (canvasWidth - w) / 2;
        d2 = window.innerWidth - d1 - w;
        d3 = Math.max(0, window.innerWidth - canvasWidth);
        tx = (d1 - d2 + d3) / 2;
    }
    document.getElementById("canvas").style.transform="translate(-"+tx+"px) scale("+sx+","+sy+")";
    document.getElementById("canvas").style.webkitTransform="translate(-"+tx+"px) scale("+sx+","+sy+")";
}
function init() {
    scale();
    var canvas, context;
    canvas = document.getElementById("canvas");
    canvas.width = 1024;
    canvas.height = 576;
    context = canvas.getContext("2d");

    var path = [{"x": canvas.width, "y": 30},
                {"x": -100, "y": 0},
                {"x": canvas.width, "y": canvas.height},
                {"x": -100, "y": canvas.height}];
    
    var path2 = [{"x": canvas.width, "y": canvas.height - 94},
                 {"x": -100, "y": canvas.height},
                 {"x": canvas.width, "y": 0},
                 {"x": -100, "y": 30 }];
    
    var path3 = [{'x': canvas.width, 'y': canvas.height / 2},
                 {'x': 800, 'y': canvas.height / 2},
                 {'x': 400, 'y': canvas.height / 2},
                 {'x': -100, 'y': canvas.height / 2},];
    
    var spawner1 = new EnemySpawner(context, path, Bird, 10, 1000, canvas.width, canvas.height);
    var spawner2 = new EnemySpawner(context, path2, Bird, 10, 1000, canvas.width, canvas.height);
    var spawner3 = new EnemySpawner(context, path3, Bird, 20, 500, canvas.width, canvas.height);
    
    var wave1 = new Wave( [spawner1], 0,0);
    var wave2 = new Wave( [spawner2], 1000, 0);
    var wave3 = new Wave( [spawner3], 1000, 7000);
    
    var level = new Level();
    level.addWave(wave1);
    level.addWave(wave2);
    level.addWave(wave3);

    var player = new Player(20, canvas.height / 2, context, canvas.width, canvas.height);
    var background = new Background(context, "assets/background.png", 2048, 576, 1024, 576);
    var input = InputController();
    var extension = {"background": background,"input": input, "player": player, "canvas": canvas, "context": context, 'level': level };
    console.profile();
    requestAnimationFrame(gameLoop.bind(extension));
}
