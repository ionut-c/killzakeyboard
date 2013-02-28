var Vector = function (x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.add = function(v){
    return new Vector(this.x + v.x, this.y + v.y);
}
Vector.prototype.substract = function (v) {
    return new Vector(this.x - v.x, this.y - v.y);
}
Vector.prototype.scale = function (v) {
    return new Vector(this.x * v.x, this.y * v.y);
}
Vector.prototype.multiplyScalar = function(n){
    return new Vector(this.x * n, this.y * n);
}
Vector.prototype.length = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
}
Vector.prototype.normalize = function () {
    var iLen = 1 / this.length();
    return new Vector(this.x * iLen, this.y * iLen);
}
Vector.prototype.dot = function (v) {
    return (this.x * v.x) + (this.y * v.y);
}

var Path = function () {
    this.points = new Array();
}

var PathWalker = function () {
    this.param = 0;
    this.curve = 0;
    this.path = null;
}
PathWalker.prototype.getStart = function () {
    if (this.path != null && this.path.points.length >= 4) {
        this.param = 0;
        this.curve = 0;
        return this.path.points[0];
    }
    return null;
}
PathWalker.prototype.getNext = function (speed) {
    i = this.curve * 3;
    points = this.path.points;
    t = this.param;

    if (points[i] != undefined && points[i + 1] != undefined && points[i + 2] != undefined && points[i + 3] != undefined) {
        v1x = -3 * points[i].x + 9 * points[i + 1].x - 9 * points[i + 2].x + 3 * points[i + 3].x;
        v1y = -3 * points[i].y + 9 * points[i + 1].y - 9 * points[i + 2].y + 3 * points[i + 3].y;

        v2x = 6 * points[i].x - 12 * points[i + 1].x + 6 * points[i + 2].x;
        v2y = 6 * points[i].y - 12 * points[i + 1].y + 6 * points[i + 2].y;

        v3x = -3 * points[i].x + 3 * points[i + 1].x;
        v3y = -3 * points[i].y + 3 * points[i + 1].y;

        v = new Vector(t * t * v1x + t * v2x + v3x,
                       t * t * v1y + t * v2y + v3y);

        t += speed / v.length();
        
        pow = Math.pow;
        x = pow(1 - t, 3) * points[i].x + 3 * pow(1 - t, 2) * t * points[i + 1].x + 3 * (1 - t) * pow(t, 2) * points[i + 2].x + pow(t, 3) * points[i + 3].x;
        y = pow(1 - t, 3) * points[i].y + 3 * pow(1 - t, 2) * t * points[i + 1].y + 3 * (1 - t) * pow(t, 2) * points[i + 2].y + pow(t, 3) * points[i + 3].y;

        if (t >= 1) {
            this.curve++;
            this.param = 0;
        } else {
            this.param = t;
        }

        return { "x": x, "y": y };
    }
    return null;
}
PathWalker.prototype.atEnd = function () {
    return (this.curve == Math.floor(this.path.points.length / 3));
}

// circle : x, y, radius
function checkColCC(circle1, circle2) {
    dist = Math.sqrt(Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2));
    if (dist < circle1.radius + circle2.radius) {
        return true;
    }
    return false;
}
// circle : x, y, radius
// line   : x1, y1, x2, y2
function checkColCL(circle, line) {
    v = new Vector(line.x2 - line.x1, line.y2 - line.y1);
    w = new Vector(circle.x - line.x1, circle.y - line.y1);
    t = w.dot(v) / v.dot(v);
    t = Math.max(0, t);
    t = Math.min(1, t);
    p = new Vector(line.x1 + v.x * t, line.y1 + v.y * t);
    p.x = p.x - circle.x;
    p.y = p.y - circle.y;
    if (p.dot(p) <= circle.radius * circle.radius) {
        return true;
    }
    return false;
}
// circle : x, y, radius
// rect   : x, y, width, height
function checkColCR(circle, rect) {
    line1 = { "x1": rect.x,              "y1": rect.y,               "x2": rect.x + rect.width, "y2": rect.y };
    line2 = { "x1": rect.x,              "y1": rect.y,               "x2": rect.x,              "y2": rect.y - rect.height };
    line3 = { "x1": rect.x + rect.width, "y1": rect.y - rect.height, "x2": rect.x,              "y2": rect.y - rect.height };
    line4 = { "x1": rect.x + rect.width, "y1": rect.y - rect.height, "x2": rect.x + rect.width, "y2": rect.y };
    if (((circle.x < rect.x + rect.width) && (circle.x > rect.x)) &&
        ((circle.y < rect.y) && (circle.y > rect.y - rect.height))) {
        return true;
    }
    if (checkColCL(circle, line1)) { return true; }
    if (checkColCL(circle, line2)) { return true; }
    if (checkColCL(circle, line3)) { return true; }
    if (checkColCL(circle, line4)) { return true; }
    return false;
}

var MyApp = {};
var path = new Path();
var walkers = new Array();
var count = 10;
var speed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function CircleCircle(ctx) {
    x = MyApp.canvas.width / 2;
    y = MyApp.canvas.height / 2;
    r = 50;

    if (checkColCC({ "x": MyApp.mousex, "y": MyApp.mousey, "radius": 50 },
               { "x": x, "y": y, "radius": r })) {
        MyApp.color = "blue";
    } else {
        MyApp.color = "red";
    }

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MyApp.color;
    ctx.beginPath();
    ctx.arc(MyApp.mousex, MyApp.mousey, 50, 0, 2 * Math.PI);
    ctx.fill();
}
function CircleLine(ctx) {
    x1 = MyApp.canvas.width / 2 - 200;
    y1 = MyApp.canvas.height / 2 - 200;
    x2 = MyApp.canvas.width / 2 + 200;
    y2 = MyApp.canvas.height / 2 + 200;

    // colision detection : circle line
    if (checkColCL({ "x": MyApp.mousex, "y": MyApp.mousey, "radius": 50 },
               { "x1": x1, "y1": y1, "x2": x2, "y2": y2 })) {
        MyApp.color = "blue";
    } else {
        MyApp.color = "red";
    }


    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.fillStyle = MyApp.color;
    ctx.beginPath();
    ctx.arc(MyApp.mousex, MyApp.mousey, 50, 0, 2 * Math.PI);
    ctx.fill();
}
function CircleRect(ctx) {
    x = MyApp.canvas.width / 2 - 150;
    y = MyApp.canvas.height / 2 + 150;
    width = 300;
    height = 300;

    // colision detection : circle line
    if (checkColCR({ "x": MyApp.mousex, "y": MyApp.mousey, "radius": 50 },
               { "x": x, "y": y, "width": width, "height": height })) {
        MyApp.color = "blue";
    } else {
        MyApp.color = "red";
    }


    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y - height);
    ctx.lineTo(x, y - height);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = MyApp.color;
    ctx.beginPath();
    ctx.arc(MyApp.mousex, MyApp.mousey, 50, 0, 2 * Math.PI);
    ctx.fill();
}

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var start = window.mozAnimationStartTime;

function draw(timestamp) {
    var progress = timestamp - start;
    MyApp.context.clearRect(0, 0, MyApp.canvas.width, MyApp.canvas.height);
    //CircleCircle(MyApp.context);
    //CircleLine(MyApp.context);
    //CircleRect(MyApp.context);

    if (path.points.length >= 4) {
        MyApp.context.strokeStyle = "green";
        MyApp.context.beginPath();
        MyApp.context.moveTo(path.points[0].x, path.points[0].y);
        for (i = 1; i < path.points.length; i += 3) {
            if (path.points[i] != undefined && path.points[i + 1] != undefined && path.points[i + 2] != undefined) {
                MyApp.context.bezierCurveTo(path.points[i].x, path.points[i].y,
                                            path.points[i + 1].x, path.points[i + 1].y,
                                            path.points[i + 2].x, path.points[i + 2].y);
            }
        }
        MyApp.context.stroke();
        
        p = new Array();
        if (restart) {
            for (i = 0; i < count; i++) {
                p.push(walkers[i].getStart());
            }
            restart = false;
        } else {
            for (var i = 0; i < count; i++) {
                if (walkers[i].atEnd()) {
                    p.push(walkers[i].getStart());
                } else {
                    p.push(walkers[i].getNext(speed[i]));
                }

            }
        }
        for (i = 0; i < count; i++) {
            MyApp.context.fillStyle = "red";
            MyApp.context.beginPath();
            v = p.pop();
            MyApp.context.arc(v.x, v.y, 20, 0, Math.PI * 2);
            MyApp.context.fill();
        }
    }

    MyApp.time += 0.010;
        requestAnimationFrame(draw);
}
function init() {
    var canvas, context;
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener('mousemove',
            function (event) {
                MyApp.mousex = event.clientX;
                MyApp.mousey = event.clientY;
            }, false);
    canvas.addEventListener('click',
            function (event) {
                path.points.push({ "x": event.clientX, "y": event.clientY });
                restart = true;
            }, false);
    context = canvas.getContext("2d");
    
    MyApp.canvas = canvas;
    MyApp.context = context;
    MyApp.color = "red";
    MyApp.time = 0;

    for (i = 0; i < 10; i++) {
        walkers.push(new PathWalker());
        walkers[i].path = path;
    }
    requestAnimationFrame(draw);
    //window.setInterval("draw()", 10);
}