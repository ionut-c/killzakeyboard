var Graphics = Graphics || {};

Graphics.Model = function Model(filePath, frameWidth, frameHeight, frameCount, frameSets, frameRate) {
    this.image = new Image();
    this.image.src = filePath;
    this.frameSize = { 'width': frameWidth, 'height': frameHeight };
    this.frameCount = frameCount;
    this.frameSets = frameSets;
    this.frameRate = frameRate;
    this.hooks = new Array();

}
Graphics.Model.prototype.getFrameRate = function Model_getFrameRate(){
    return this.frameRate;
}
Graphics.Model.prototype.getFrameCount = function Model_getFrameCount(){
    return this.frameCount;
}
Graphics.Model.prototype.getImage = function Model_getImage(){
    return this.image;
}
Graphics.Model.prototype.getSize = function Model_getSize(){
    return this.frameSize;
}
Graphics.Model.prototype.addHook = function Model_addHook(hook){
    if ( this.hooks.some (function (_hook){
        return _hook.getName() == hook.getName()})) {
        throw "There can be no 2 hooks with the same name";
    } else {
        this.hooks.push (hook);
    }
}
Graphics.Model.prototype.getHook = function Model_getHook(hook_name){
    return this.hooks.filter (function (hook){
                return hook.getName () == hook_name}).pop();
}

Graphics.ModelHook = function ModelHook(name, position){
    this.name = name;
    this.position = position;
    this.object = undefined;
    this.bound = false;
}
Graphics.ModelHook.prototype.getName = function ModelHook_getName(){
    return this.name;
}
Graphics.ModelHook.prototype.getPosition = function ModelHook_getPosition(){
    if ( this.bound ) {
        var tmp = this.object.getPosition();
    } else {
        var tmp = new Point(0,0);
    }
    var position = new Point (tmp.x + this.position.x, tmp.y + this.position.y);
    return position;
}
Graphics.ModelHook.prototype.bindModelObject = function ModelHook_bindModelObject(object){
    this.object = object;
    this.bound = true;
}

Graphics.loadModels = function Graphics_loadModels() {
    PlayerModel = new Graphics.Model("assets/sprites/player_sprite.png", 240, 100, 6, 1, 1000/24);
    p1_hook = new Graphics.ModelHook("Launcher", new Point(227, 49));
    PlayerModel.addHook (p1_hook);
    
    BirdModel = new Graphics.Model("assets/sprites/koocha_sprite.png", 105, 100, 6, 1, 1000/24);
    AppleModel = new Graphics.Model("assets/sprites/apple_sprite.png", 22, 27, 1, 1, 1000/1000);
    KoochaDeathModel = new Graphics.Model("assets/sprites/death_animation_detail.png", 124, 100, 6, 1, 1000/24);
    ShootEffectModel = new Graphics.Model("assets/sprites/shoot_effect.png", 30, 30, 6, 1, 1000/24);
}

Graphics.ModelObject = function ModelObject(model, context){
    this.context = context;
    this.model = model;
    this.index = 0;
    this.lastIndex = model.getFrameCount();
    this.elapsedTime = 0;
    this.indexFrameset = 0;
    this.position = { "x" : 0, "y" : 0 }
    this.current = { 'x': 0, 'y': 0 }
    this.modelSize = this.model.getSize();
    this.ended = false;
}
Graphics.ModelObject.prototype.update = function ModelObject_update(deltaTime){
    this.elapsedTime += deltaTime;
    if( this.elapsedTime >= this.model.getFrameRate()){
        //next frame
        if (this.index + 1 == this.lastIndex) {
            this.ended = true;
            this.index = 0;
        } else {
            this.index++;
        }
        this.current.x = this.index * this.modelSize.width;
        this.elapsedTime = 0;
    } 
}
Graphics.ModelObject.prototype.render = function ModelObject_render(){
    this.context.drawImage(this.model.getImage(),
                      this.current.x, this.current.y,
                      this.modelSize.width,
                      this.modelSize.height,
                      this.position.x,
                      this.position.y,
                      this.modelSize.width,
                      this.modelSize.height);
}
Graphics.ModelObject.prototype.setPosition = function ModelObject_setPosition(point) {
    this.position.x = point.x;
    this.position.y = point.y;
}
Graphics.ModelObject.prototype.getPosition = function ModelObject_getPosition(){
    return { "x": this.position.x, "y": this.position.y };
}
Graphics.ModelObject.prototype.getSize = function ModelObject_getSize(){
    return this.modelSize;
}
Graphics.ModelObject.prototype.getContext = function ModelObject_getContext(){
    return this.context;
}
Graphics.ModelObject.prototype.isOver = function ModelObject_isOver(){
    return this.ended;
}
Graphics.ModelObject.prototype.getHook = function ModelObject_getHook(hook_name){
    var hook = this.model.getHook(hook_name);
    hook.bindModelObject(this);
    return hook;
}