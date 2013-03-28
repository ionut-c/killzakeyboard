PlayerModel = new Model("assets/player_sprite.png", 191.25, 60, 24, 1, 1000/24);

function Player(x, y, context, maxX, maxY){
    this.model = new ModelObject(PlayerModel, context);
    this.speed = 10;
    this.position = new Point(x, y);
    this.shootInterval = 200;
    this.canShoot = true;
    this.elapsedTime = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    
    this.model.setPosition(this.position);
    this.s = this.model.getSize();
    this.bounder = new Bounder("rect", new Rect(this.position.x, this.position.y + 29, this.s.width, this.s.height - 37));
};
Player.prototype.checkCollision = function Player_checkCollision(bounder){
    return this.bounder.checkCollision(bounder);
}
Player.prototype.getBounder = function Player_getBounder(){
    return this.bounder;
}
Player.prototype.getY = function Player_getY(){
    return this.position.y;
}
Player.prototype.getHeight = function Player_getHeight(){
    return this.s.height;
}
Player.prototype.update = function Player_update(inputHandler, deltaTime){
    if(!this.canShoot){
        this.elapsedTime += deltaTime;
        if( this.elapsedTime >= this.shootInterval){
            this.elapsedTime = 0;
            this.canShoot = true;
            }
    }
    
    var s = this.model.getSize();
    this.bounder.setParams(new Rect(this.position.x, this.position.y, this.s.width, this.s.height));
    
    if (inputHandler.checkKey(32) && this.canShoot) {
        shootSound();
        var tor = new Apple(this.position.x + this.s.width, this.position.y + this.s.height / 2, this.model.getContext(), this.maxX, this.maxY);
        this.canShoot = false;
    }
    if (inputHandler.checkKey(38) && this.position.y >= this.speed) { this.position.y -= this.speed; }
    if (inputHandler.checkKey(40) && this.position.y + this.s.height + this.speed <= this.maxY) { this.position.y += this.speed; }
    if (inputHandler.checkKey(37) && this.position.x >= this.speed) { this.position.x -= this.speed; }
    if (inputHandler.checkKey(39) && this.position.x + this.s.width + this.speed <= this.maxX) { this.position.x += this.speed; }
    
    this.model.setPosition(this.position);
    this.model.update(deltaTime);
    
    if(tor != null){ return tor; }
    else { return null; }
}
Player.prototype.render = function Player_render(deltaTime){
    this.model.render();
}