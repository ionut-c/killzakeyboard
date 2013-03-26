AppleModel = new Model("assets/apple_sprite.png", 22, 27, 1, 1, 1000/24);

function Apple(x, y, context, maxX, maxY){
    this.model = new ModelObject(AppleModel, context);
    this.speed = 20;
    this.position = new Point(x, y);
    this.visible = true;
    this.maxX = maxX;
    this.maxY = maxY;
    
    this.model.setPosition(this.position);
    var s = this.model.getSize();
    this.bounder = new Bounder("circle", new Circle(this.position.x + s.width / 2, this.position.y + s.height / 2, s.width / 2));
}
Apple.prototype.checkCollision = function Apple_checkCollision(bounder){ return this.bounder.checkCollision(bounder); }
Apple.prototype.getBounder = function Apple_getBounder(){ return this.bounder; }

Apple.prototype.update = function Apple_update(inputHandler, deltaTime){
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
Apple.prototype.render = function Apple_render(deltaTime){
    this.model.render();
    if(window.debug) { this.bounder.render( "red", this.model.getContext()); }
}
Apple.prototype.isVisible = function Apple_isVisible(){
    return this.visible;
}