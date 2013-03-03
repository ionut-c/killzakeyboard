(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var start = window.animationStartTime;

progress = 0;
prev = 0;
mousex = 0;
mousey = 0;

function draw(time) {
    var context = this.context;
    var path = this.path;
    
    if (prev != 0) {
        progress = time - prev;
    }
    prev = time;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    context.strokeStyle = "green";
    context.beginPath();
    context.moveTo(path[0].x, path[0].y);
    for (var i = 1; i < path.length; i += 3) {
        if (path[i] != undefined && path[i + 1] != undefined && path[i + 2] != undefined) {
            context.bezierCurveTo(path[i].x, path[i].y,
                                  path[i + 1].x, path[i + 1].y,
                                  path[i + 2].x, path[i + 2].y);
            }
        }
    context.stroke();
    
    context.strokeRect(mousex - 25, mousey - 25,50,50);

    this.entityManager.update(progress);
    
    requestAnimationFrame(draw.bind(this));
}

function init() {
    var canvas, context;
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener('mousemove',
            function (event) {
                mousex = event.clientX;
                mousey = event.clientY;
            }, false);
    context = canvas.getContext("2d");

    var path = [{"x": canvas.width, "y": 30},
                {"x": 100, "y": 0},
                {"x": canvas.width, "y": canvas.height},
                {"x": 0, "y": canvas.height - 40}];
    
    var entityManager = EntityManager([
        EnemySpawner(context, path, Bird, 10, 1000),
        EnemySpawner(context, path, Bird, 10, 700),
        EnemySpawner(context, path, Bird, 10, 1100)
    ]);
    canvas.addEventListener('click',
            function (event) {
                entityManager.addCollider(
                        Bird(context, [
                            {'x': 0, 'y': event.clientY},
                            {'x': 100, 'y': event.clientY},
                            {'x': 200, 'y': event.clientY},
                            {'x': 1000, 'y': event.clientY},
                        ])
                    );
            }, false);
    var extension = { "canvas": canvas, "context": context, 'entityManager': entityManager ,"path": path};
    
    requestAnimationFrame(draw.bind(extension));
    //window.setInterval("draw()", 10);
}
