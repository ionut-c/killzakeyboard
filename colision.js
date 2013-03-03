// type : ["line","rect","circle"]
// params :
//           - line : x1, y1, x2, y2
//           - rect : x, y, width, height
//           - circle : x, y, radius
var Bounder = function (type, params){
    this.type = type;
    this.params = params;
}
Bounder.prototype.getType = function (){
    return this.type;
}
Bounder.prototype.getParams = function (){
    return this.params;
}
Bounder.prototype.checkCollision = function (bounder){
    var bounder_type = bounder.getType();
    
    if( this.type == "cirlce" && bounder_type == "cirlce" ) {return checkColCC(this.params, bounder.getParams())}
    if( this.type == "line" && bounder_type == "line" ) {return checkColLL(this.params, bounder.getParams())}
    if( this.type == "rect" && bounder_type == "rect" ) {return checkColRR(this.params, bounder.getParams())}
    
    if( (this.type == "circle" || this.type == "line") && (bounder_type == "line" || bounder_type == "circle") ){
        return checkColCL(this.params, bounder.getParams());
    }
    if( (this.type == "circle" || this.type == "rect") && (bounder_type == "rect" || bounder_type == "circle") ){
        return checkColCR(this.params, bounder.getParams());
    }
    if( (this.type == "rect" || this.type == "line") && (bounder_type == "line" || bounder_type == "rect") ){
        return checkColLR(this.params, bounder.getParams());
    }
    
    return null;
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
    var v = new Vector(line.x2 - line.x1, line.y2 - line.y1);
    var w = new Vector(circle.x - line.x1, circle.y - line.y1);
    var t = w.dot(v) / v.dot(v);
    t = Math.max(0, t);
    t = Math.min(1, t);
    var p = new Vector(line.x1 + v.x * t, line.y1 + v.y * t);
    p.x = p.x - circle.x;
    p.y = p.y - circle.y;
    if (p.dot(p) <= circle.radius * circle.radius) {
        return true;
    }
    return false;
}
// This is for normal, not rotated rectangles
// circle : x, y, radius
// rect   : x, y, width, height
function checkColCR(circle, rect) {
    var line1 = { "x1": rect.x, "y1": rect.y, "x2": rect.x + rect.width, "y2": rect.y };
    var line2 = { "x1": rect.x, "y1": rect.y, "x2": rect.x, "y2": rect.y - rect.height };
    var line3 = { "x1": rect.x + rect.width, "y1": rect.y - rect.height, "x2": rect.x, "y2": rect.y - rect.height };
    var line4 = { "x1": rect.x + rect.width, "y1": rect.y - rect.height, "x2": rect.x + rect.width, "y2": rect.y };
    // check to see if the circle`s center is inside the rectangle
    if (((circle.x < rect.x + rect.width) && (circle.x > rect.x)) && ((circle.y < rect.y) && (circle.y > rect.y - rect.height))) {
        return true;
    }
    // check to see if the circle is close enough to one of the lines
    // WARNING : this counts on the fact that the rectangle is not rotated
    var testY = circle.y > rect.y - rect.height && circle.y < rect.y;
    var testX = circle.x > rect.x && circle.x < rect.x + rect.width;
    var distance = circle.y - line1.y1;

    var lineProximityTests = new Array();
    lineProximityTests[0] = testX && (circle.y - rect.y >= 0) && (circle.y - rect.y <= circle.radius);
    lineProximityTests[1] = testY && (rect.x - circle.x >= 0) && (rect.x - circle.x <= circle.radius);
    lineProximityTests[2] = testX && (rect.y - rect.height - circle.y >= 0) && (rect.y - rect.height - circle.y <= circle.radius);
    lineProximityTests[3] = testY && (circle.x - rect.x - rect.width >= 0) && (circle.x - rect.x - rect.width <= circle.radius);
    var tmp = false;
    lineProximityTests.map(function (element) { if (element) { tmp = true; } });
    if (tmp == true) { return true; }

    // check to see if the circle is close enough to one of the points
    var cornerProximityTests = new Array();
    cornerProximityTests[0] = (circle.x - rect.x) * (circle.x - rect.x) + (circle.y - rect.y) * (circle.y - rect.y);
    cornerProximityTests[1] = (circle.x - rect.x) * (circle.x - rect.x) + (circle.y - rect.y + rect.height) * (circle.y - rect.y + rect.height);
    cornerProximityTests[2] = (circle.x - rect.x - rect.width) * (circle.x - rect.x - rect.width) + (circle.y - rect.y + rect.height) * (circle.y - rect.y + rect.height);
    cornerProximityTests[3] = (circle.x - rect.x - rect.width) * (circle.x - rect.x - rect.width) + (circle.y - rect.y) * (circle.y - rect.y);
    tmp = false;
    cornerProximityTests.map(function (element) { if (element <= circle.radius * circle.radius) { tmp = true; } });
    if (tmp == true) { return true; }

    return false;
}
// line   : x1, y1, x2, y2
function checkColLL(line1, line2) {
    var b = new Vector(line1.x2 - line1.x1, line1.y2 - line1.y1);
    var d = new Vector(line2.x2 - line2.x1, line2.y2 - line2.y1);
    var b_dot_d_perp = b.x * d.y - b.y * d.x;
    if(b_dot_d_perp == 0) {
        return null;
    }
    var c = new Vector(line2.x1 - line1.x1, line2.y1 - line1.y1);
    var t = (c.x * d.y - c.y * d.x) / b_dot_d_perp;
    if(t < 0 || t > 1) {
        return null;
    }
    var u = (c.x * b.y - c.y * b.x) / b_dot_d_perp;
    if(u < 0 || u > 1) { 
        return null;
    }
    return true;
}
// This is for normal, not rotated rectangles
// line   : x1, y1, x2, y2
// rect   : x, y, width, height
function checkColLR(line, rect) {
    var p = new Array({ "x": rect.x, "y": rect.y },
                      { "x": rect.x, "y": rect.y - rect.height },
                      { "x": rect.x + rect.width, "y": rect.y },
                      { "x": rect.x + rect.width, "y": rect.y - rect.height });
    var checker = 0;
    var above = false;
    var below = false;
    for (var i = 0; i < 4; i++) {
        var r = (line.x2 - line.x1) * p[i].y - (line.y2 - line.y1) * p[i].x - line.x2 * line.y1 + line.y2 * line.x1;
        if (r == 0) { return true; }
        if (r > 0) { above = true; }
        else { below = true; }
    }
    if ((above && !below) || (!above && below)) { return false; }
    else {
        var intersection = false;
        var case1 = (line.x1 > rect.x + rect.width) && (line.x2 > rect.x + rect.width);
        var case2 = (line.x1 < rect.x) && (line.x2 < rect.x);
        var case3 = (line.y1 < rect.y - rect.height) && (line.y2 < rect.y - rect.height);
        var case4 = (line.y1 > rect.y) && (line.y2 > rect.y);
        //if (line.y2 > 400) { debugger; }
        if (case1 || case2 || case3 || case4) { return false; }
        else { return true; }
    }
}
// rect   : x, y, width, height
function checkColRR(rect1, rect2){
    var rect1_left = rect2.x < rect1.x && rect1.x < rect2.x + rect2.width;
    var rect1_right = rect2.x < rect1.x && rect1.x + rect1.width < rect2.x + rect2.width;
    var rect1_top = rect2.y < rect1.y && rect1.y < rect2.y + rect2.height;
    var rect1_bottom = rect2.y < rect1.y + rect1.height && rect1.y + rect1.height < rect2.y + rect2.height;
    if( (rect1_left || rect1_right) && (rect1_top || rect1_bottom)){ return true; }
    
    var rect2_left = rect1.x < rect2.x && rect2.x < rect1.x + rect1.width;
    var rect2_right = rect1.x < rect2.x && rect2.x + rect2.width < rect1.x + rect1.width;
    var rect2_top = rect1.y < rect2.y && rect2.y < rect1.y + rect1.height;
    var rect2_bottom = rect1.y < rect2.y + rect2.height && rect2.y + rect2.height < rect1.y + rect1.height;
    if( (rect2_left || rect2_right) && (rect2_top || rect2_bottom)){ return true; }
    
    return false;
}