function EntityManager() {
    this.entities = [];
    this.colliders = [];
    this.kills = 0;
    this.entitiesTotalCount = 0;
}
EntityManager.prototype.addCollider = function EntityManager_addCollider(collider){
    this.colliders.push(collider);
}
EntityManager.prototype.addEntities = function EntityManager_addEntities(entities){
    this.entitiesTotalCount += entities.length;
    this.entities = this.entities.concat(entities);
}
EntityManager.prototype.update = function EntityManager_update(deltaTime) {
    var colliders = this.colliders;
    this.entities = this.entities
        .map(function(entity) {
            for(var i = 0; i < colliders.length; i++) {
                if(entity.checkCollision(colliders[i].getBounder())) {
                    colliders.splice(i,1);
                }
            }
            return entity;
        });
    this.entities.map(function(entity) { entity.update(deltaTime); });
    this.colliders.map(function(entity) { entity.update(deltaTime); });
    
    this.colliders = this.colliders.filter(function (o) { return o.isVisible();});
    this.entities = this.entities.filter(function (o) { return o.isVisible();});
    var killed = 0;
    this.entities = this.entities.filter(function (o) {
        var test = o.isAlive();
        if( !test ){ killed++;}
        return test;
        });
    this.kills += killed;
}
EntityManager.prototype.render = function EntityManager_render(){
    this.entities.map(function(entity) { entity.render(); });
    this.colliders.map(function(entity) { entity.render(); });
}
EntityManager.prototype.getKills = function EntityManager_getKills(){
    return this.kills;
}
EntityManager.prototype.getTotalEntitiesCount = function EntityManager_getTotalEntitiesCount(){
    return this.entitiesTotalCount;
}

function EnemySpawner(context, path, enemyType, numbers, frequency, maxX, maxY) {
    this.elapsedTime = 0;
    this.spawnedEnemies = 0;
    this.frequency = frequency;
    this.path = path;
    this.context = context;
    this.enemyType = enemyType;
    this.numbers = numbers;
    this.maxX = maxX;
    this.maxY = maxY;
}
EnemySpawner.prototype.getSpawned = function EnemySpawner_getSpawned(deltaTime){
    this.elapsedTime += deltaTime;
        if(this.elapsedTime >= this.frequency && this.spawnedEnemies < this.numbers) {
            this.spawnedEnemies++;
            this.elapsedTime = 0;
            return new this.enemyType(this.context, this.path, this.maxX, this.maxY);
        }
        return null;
}
EnemySpawner.prototype.getDuration = function EnemySpawner_getDuration(){
    return this.numbers * this.frequency;
}

BirdModel = new Model("assets/koocha_sprite_2.png", 88, 94, 23, 1, 1000/24);

function Bird(context, path, maxX, maxY){
    this.model = new ModelObject(BirdModel, context);
    this.walker = new PathWalker(path);
    this.speed = 5;
    this.visible = true;
    this.maxX = maxX;
    this.maxY = maxY;
    this.alive = true;
    
    var position = this.walker.getStart();
    var modelSize = this.model.getSize();
    this.model.setPosition(position);
    this.bounder = new Bounder("rect", new Rect(position.x + 5, position.y + 30, modelSize.width - 10, modelSize.height - 65));
}
Bird.prototype.checkCollision = function Bird_checkCollision(bounder){
    var test = this.bounder.checkCollision(bounder);
    if( test ){
        this.alive = false; }
    return test;
}
Bird.prototype.isAlive = function Bird_isAlive(){
    return this.alive;
}
Bird.prototype.getBounder = function Bird_getBounder(){
    return this.bounder;
}
Bird.prototype.update = function Bird_update(deltaTime){
    var position = this.walker.getNext(this.speed);
    var modelSize = this.model.getSize();
    
    if( position.x < -modelSize.width) { this.visible = false; }
    else if( position.x > this.maxX + modelSize.width) { this.visible = false; }
    else if( position.y < -modelSize.height) { this.visible = false; }
    else if( position.y > this.maxY + modelSize.height) { this.visible = false; }
    
    if( !this.walker.atEnd()){
        this.model.setPosition(position);
        this.bounder.setParams(new Rect(position.x + 5, position.y + 30, modelSize.width - 10, modelSize.height - 65));
    }
    this.model.update(deltaTime);
}
Bird.prototype.render = function Bird_render(deltaTime){
    this.model.render();
    if(window.debug) { this.bounder.render( "red", this.model.getContext()); }
}
Bird.prototype.isVisible = function Bird_isVisible(){
    return this.visible;
}