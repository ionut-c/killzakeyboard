var Game = Game || {};

Game.Bird = function Bird(context, path){
    this.model = new Graphics.ModelObject(BirdModel, context);
    this.walker = new PathWalker(path);
    this.speed = 5;
    this.visible = true;
    this.alive = true;
    
    var position = this.walker.getStart();
    var modelSize = this.model.getSize();
    this.model.setPosition(position);
    this.bounder = new Physics.Bounder("rect", new Rect(position.x + 5, position.y + 30, modelSize.width - 10, modelSize.height - 65));
}
Game.Bird.prototype.checkCollision = function Bird_checkCollision(bounder){
    var test = this.bounder.checkCollision(bounder);
    if( test ){ this.alive = false; }
    return test;
}
Game.Bird.prototype.isAlive = function Bird_isAlive(){
    return this.alive;
}
Game.Bird.prototype.getBounder = function Bird_getBounder(){
    return this.bounder;
}
Game.Bird.prototype.update = function Bird_update(deltaTime){
    var position = this.walker.getNext(this.speed);
    var modelSize = this.model.getSize();
    
    if( !this.walker.atEnd()){
        this.model.setPosition(position);
        this.bounder.setParams(new Rect(position.x + 5, position.y + 30, modelSize.width - 10, modelSize.height - 65));
    }
    this.model.update(deltaTime);
}
Game.Bird.prototype.render = function Bird_render(deltaTime){
    this.model.render();
    if(window.debug) { this.bounder.render( "red", this.model.getContext()); }
}
Game.Bird.prototype.isVisible = function Bird_isVisible(){
    return this.visible;
}

Game.Apple = function Apple(x, y, context, maxX, maxY){
    this.model = new Graphics.ModelObject(AppleModel, context);
    this.speed = 20;
    this.position = new Point(x, y);
    this.visible = true;
    this.maxX = maxX;
    this.maxY = maxY;
    
    this.model.setPosition(this.position);
    var s = this.model.getSize();
    this.bounder = new Physics.Bounder("circle", new Circle(this.position.x + s.width / 2, this.position.y + s.height / 2, s.width / 2));
}
Game.Apple.prototype.checkCollision = function Apple_checkCollision(bounder){ return this.bounder.checkCollision(bounder); }
Game.Apple.prototype.getBounder = function Apple_getBounder(){ return this.bounder; }

Game.Apple.prototype.update = function Apple_update(inputHandler, deltaTime){
    var s = this.bounder.getParams();
    var modelSize = this.model.getSize();
    
    this.position.x += this.speed;
    if( this.position.x < -modelSize.width) { this.visible = false; }
    else if( this.position.x > this.maxX + modelSize.width) { this.visible = false; }
    else if( this.position.y < -modelSize.height) { this.visible = false; }
    else if( this.position.y > this.maxY + modelSize.height) { this.visible = false; }

    this.bounder.setParams(new Circle(this.position.x + modelSize.width / 2, this.position.y + modelSize.height / 2, s.radius));
    this.model.setPosition(this.position);
    this.model.update(deltaTime);
}
Game.Apple.prototype.render = function Apple_render(deltaTime){
    this.model.render();
    if(window.debug) { this.bounder.render( "red", this.model.getContext()); }
}
Game.Apple.prototype.isVisible = function Apple_isVisible(){
    return this.visible;
}

function PathWalker(path) {
    this.param = 0;
    this.curve = 0;
    this.path = path;
}
PathWalker.prototype.getStart = function PathWalker_getStart() {
    if (this.path != null && this.path.length >= 4) {
        this.param = 0;
        this.curve = 0;
        return this.path[0];
    }
    return null;
}
PathWalker.prototype.getNext = function PathWalker_getNext(speed) {
    var i = this.curve * 3;
    var points = this.path;
    var t = this.param;
    if (points[i] != undefined && points[i + 1] != undefined && points[i + 2] != undefined && points[i + 3] != undefined) {
        // calculate some kinda derivates
        v1x = -3 * points[i].x + 9 * points[i + 1].x - 9 * points[i + 2].x + 3 * points[i + 3].x;
        v1y = -3 * points[i].y + 9 * points[i + 1].y - 9 * points[i + 2].y + 3 * points[i + 3].y;

        v2x = 6 * points[i].x - 12 * points[i + 1].x + 6 * points[i + 2].x;
        v2y = 6 * points[i].y - 12 * points[i + 1].y + 6 * points[i + 2].y;

        v3x = -3 * points[i].x + 3 * points[i + 1].x;
        v3y = -3 * points[i].y + 3 * points[i + 1].y;

        // gets you the wanted "t" for the specified speed
        t += speed / Math.sqrt((t * t * v1x + t * v2x + v3x) * (t * t * v1x + t * v2x + v3x) + (t * t * v1y + t * v2y + v3y) * (t * t * v1y + t * v2y + v3y));

        // cubic bezier formula
        x = Math.pow(1 - t, 3) * points[i].x + 3 * Math.pow(1 - t, 2) * t * points[i + 1].x + 3 * (1 - t) * Math.pow(t, 2) * points[i + 2].x + Math.pow(t, 3) * points[i + 3].x;
        y = Math.pow(1 - t, 3) * points[i].y + 3 * Math.pow(1 - t, 2) * t * points[i + 1].y + 3 * (1 - t) * Math.pow(t, 2) * points[i + 2].y + Math.pow(t, 3) * points[i + 3].y;

        // if "t" is at the end go to next curve
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
PathWalker.prototype.atEnd = function PathWalker_atEnd() {
    return (this.curve == Math.floor(this.path.length / 3));
}