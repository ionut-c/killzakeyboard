var Game = Game || {};

Game.Player = function Player(x, y, context, maxX, maxY){
    this.model = new Graphics.ModelObject(PlayerModel, context);
    this.speed = 10;
    this.position = new Point(x, y);
    this.shootInterval = 200;
    this.canShoot = true;
    this.elapsedTime = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    
    this.model.setPosition(this.position);
    this.s = this.model.getSize();
    this.bounder = new Physics.Bounder("rect", new Rect(this.position.x, this.position.y + 29, this.s.width, this.s.height - 37));
};
Game.Player.prototype.checkCollision = function Player_checkCollision(bounder){
    return this.bounder.checkCollision(bounder);
}
Game.Player.prototype.getBounder = function Player_getBounder(){
    return this.bounder;
}
Game.Player.prototype.getY = function Player_getY(){
    return this.position.y;
}
Game.Player.prototype.getX = function Player_getX(){
    return this.position.x;
}
Game.Player.prototype.getHeight = function Player_getHeight(){
    return this.s.height;
}
Game.Player.prototype.update = function Player_update(inputHandler, deltaTime){
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
        Sound.playSFX(Sound.SFXConst.shoot);
        global.EffectManager.addEffect("ShootEffect", this.model.getHook("Launcher"));
        apple_position = this.model.getHook("Launcher").getPosition();
        var tor = new Game.Apple(apple_position.x, apple_position.y, this.model.getContext(), this.maxX, this.maxY);
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
Game.Player.prototype.render = function Player_render(deltaTime){
    this.model.render();
}
