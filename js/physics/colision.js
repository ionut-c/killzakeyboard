var Physics = Physics || { };

// type : ["line","rect","circle"]
// params :
//           - line : x1, y1, x2, y2
//           - rect : x, y, width, height
//           - circle : x, y, radius
Physics.Bounder = function Bounder(type, params){
    this.type = type;
    this.params = params;
}
Physics.Bounder.prototype.getType = function Bounder_getType(){
    return this.type;
}
Physics.Bounder.prototype.getParams = function Bounder_getParams(){
    return this.params;
}
Physics.Bounder.prototype.setParams = function Bounder_setParams(params){
    this.params = params;
}
Physics.Bounder.prototype.checkCollision = function Bounder_checkCollision(bounder){
    var bounder_type = bounder.getType();
    
    with( Physics ){
        if( this.type == "cirlce" && bounder_type == "cirlce" ) {return checkCircleCircle(this.params, bounder.getParams())}
        if( this.type == "line" && bounder_type == "line" ) {return checkLineLine(this.params, bounder.getParams())}
        if( this.type == "rect" && bounder_type == "rect" ) {return checkRectangleRectangle(this.params, bounder.getParams())}
        
        if( this.type == "circle" && bounder_type == "line"){ return checkCircleLine(this.params, bounder.getParams()); }
        if( this.type == "line" && bounder_type == "circle"){ return checkCircleLine(bounder.getParams(), this.params); }
        if( this.type == "circle" && bounder_type == "rect"){ return checkCircleRectangle(this.params, bounder.getParams()); }
        if( this.type == "rect" && bounder_type == "circle"){ return checkCircleRectangle(bounder.getParams(), this.params); }
        if( this.type == "rect" && bounder_type == "line"){ return checkLineRectangle(this.params, bounder.getParams()); }
        if( this.type == "line" && bounder_type == "rect"){ return checkLineRectangle(this.params, bounder.getParams()); }
    }
    return false;
}
Physics.Bounder.prototype.render = function Bounder_render(color, context){
    if(this.type == "circle"){
        context.strokeStyle = color;
        context.beginPath();
        context.arc(this.params.x, this.params.y, this.params.radius, 0, 2 * Math.PI, false);
        context.stroke();
    } else if (this.type == "line"){
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(this.params.x1, this.params.y1);
        context.lineTo(this.params.x2, this.params.y2)
        context.stroke();
    } else if (this.type == "rect"){
        context.strokeStyle = color;
        context.strokeRect(this.params.x, this.params.y, this.params.width, this.params.height);
        //context.stroke(); // really wierd bug here
    }
}

// circle : x, y, radius
Physics.checkCircleCircle = function collisionCC(circle1, circle2) {
    dist = Math.sqrt(Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2));
    if (dist < circle1.radius + circle2.radius) {
        return true;
    }
    return false;
}
// circle : x, y, radius
// line   : x1, y1, x2, y2
Physics.checkCircleLine = function collisionCL(circle, line) {
    var vx = line.x2 - line.x1;
    var vy = line.y2 - line.y1;
    var wx = circle.x - line.x1;
    var wy = circle.y - line.y1;
    var t = ((wx * vx) + (wy * vy)) / ((vx * vx) + (vy * vvy));
    t = Math.max(0, t);
    t = Math.min(1, t);
    var px = line.x1 + v.x * t;
    var py = line.y1 + v.y * t;
    px = px - circle.x;
    py = py - circle.y;
    if ((px * px) + (py * py) <= circle.radius * circle.radius) {
        return true;
    }
    return false;
}
// This is for normal, not rotated rectangles
// circle : x, y, radius
// rect   : x, y, width, height
Physics.checkCircleRectangle = function collisionCR(circle, rect) {
    // check to see if the circle is close enough to one of the lines
    // WARNING : this counts on the fact that the rectangle is not rotated
    var testY = circle.y > rect.y && circle.y < rect.y + rect.height;
    var testX = circle.x > rect.x && circle.x < rect.x + rect.width;
    // check to see if the circle`s center is inside the rectangle
    if (testX && testY) { return true; }

    if(testX && (rect.y - circle.y >= 0) && (rect.y - circle.y <= circle.radius)) { return true; }
    if(testY && (rect.x - circle.x >= 0) && (rect.x - circle.x <= circle.radius)) { return true; }
    if(testX && (circle.y - rect.y - rect.height >= 0) && (circle.y - rect.y - rect.height <= circle.radius)) { return true; }
    if(testY && (circle.x - rect.x - rect.width >= 0) && (circle.x - rect.x - rect.width <= circle.radius)) { return true; }

    // check to see if the circle is close enough to one of the points    
    if((circle.x - rect.x) * (circle.x - rect.x) + (circle.y - rect.y) * (circle.y - rect.y) <= circle.radius * circle.radius) { return true; }
    if((circle.x - rect.x) * (circle.x - rect.x) + (circle.y - rect.y - rect.height) * (circle.y - rect.y - rect.height) <= circle.radius * circle.radius) { return true; }
    if((circle.x - rect.x - rect.width) * (circle.x - rect.x - rect.width) + (circle.y - rect.y - rect.height) * (circle.y - rect.y - rect.height)<= circle.radius * circle.radius) { return true; }
    if((circle.x - rect.x - rect.width) * (circle.x - rect.x - rect.width) + (circle.y - rect.y) * (circle.y - rect.y) <= circle.radius * circle.radius) { return true; }

    return false;
}
// line   : x1, y1, x2, y2
Physics.checkLineLine = function collisionLL(line1, line2) {
    var bx = line1.x2 - line1.x1;
    var by = line1.y2 - line1.y1;
    var dx = line2.x2 - line2.x1;
    var dy = line2.y2 - line2.y1;
    var b_dot_d_perp = bx * dy - by * dx;
    if(b_dot_d_perp == 0) {
        return null;
    }
    var cx = line2.x1 - line1.x1;
    var cy = line2.y1 - line1.y1;
    var t = (cx * dy - cy * dx) / b_dot_d_perp;
    if(t < 0 || t > 1) {
        return null;
    }
    var u = (cx * by - cy * bx) / b_dot_d_perp;
    if(u < 0 || u > 1) { 
        return null;
    }
    return true;
}
// This is for normal, not rotated rectangles
// line   : x1, y1, x2, y2
// rect   : x, y, width, height
Physics.checkLineRectangle = function collisionLR(line, rect) {
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
Physics.checkRectangleRectangle = function collisionRR(rect1, rect2){
    var rect1_left = rect2.x < rect1.x && rect1.x < rect2.x + rect2.width;
    var rect1_right = rect2.x < rect1.x + rect1.width && rect1.x + rect1.width < rect2.x + rect2.width;
    var rect1_top = rect2.y < rect1.y && rect1.y < rect2.y + rect2.height;
    var rect1_bottom = rect2.y < rect1.y + rect1.height && rect1.y + rect1.height < rect2.y + rect2.height;
    if( (rect1_left || rect1_right) && (rect1_top || rect1_bottom)){ return true; }
    
    var rect2_left = rect1.x < rect2.x && rect2.x < rect1.x + rect1.width;
    var rect2_right = rect1.x < rect2.x + rect2.width && rect2.x + rect2.width < rect1.x + rect1.width;
    var rect2_top = rect1.y < rect2.y && rect2.y < rect1.y + rect1.height;
    var rect2_bottom = rect1.y < rect2.y + rect2.height && rect2.y + rect2.height < rect1.y + rect1.height;
    if( (rect2_left || rect2_right) && (rect2_top || rect2_bottom)){ return true; }

    return false;
}
