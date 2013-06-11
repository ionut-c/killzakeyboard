var Game = Game || {};

Game.EntityManager = function EntityManager(maxX, maxY) {
    this.bounder = new Physics.Bounder("rect", new Rect(0, 0, maxX, maxY));
    this.entities = [];
    this.colliders = [];
    this.kills = 0;
    this.projectileTotalCount = 0;
    this.entitiesTotalCount = 0;
    this.escaped = 0;
}
Game.EntityManager.prototype.addCollider = function EntityManager_addCollider(collider){
    this.projectileTotalCount += 1;
    this.colliders.push(collider);
}
Game.EntityManager.prototype.addEntities = function EntityManager_addEntities(entities){
    this.entitiesTotalCount += entities.length;
    this.entities = this.entities.concat(entities);
}
Game.EntityManager.prototype.getEntityCount = function EntityManager_getEntityCount(){
    return this.entities.length;
}
Game.EntityManager.prototype.update = function EntityManager_update(deltaTime) {
    this.entities = this.entities
                    .map(function(entity) {
                        for(var i = 0; i < this.colliders.length; i++) {
                            if(entity.checkCollision(this.colliders[i].getBounder())) {
                                this.colliders.splice(i,1);
                            }
                        }
                        return entity;
                    }, this);
    
    this.entities.map(function(entity) { entity.update(deltaTime); });
    this.colliders.map(function(entity) { entity.update(deltaTime); });
    
    this.colliders = this.colliders.filter(function (o) { return o.isVisible();});
    this.entities = this.entities.filter(function (o) { return o.isVisible();});
    var killed = 0;
    var missed = 0;
    this.entities = this.entities.filter(function (o) {
        var test = o.isAlive();
        if( !test ){ killed++;}
        if( !this.bounder.checkCollision( o.getBounder() )){
            missed++;
            return false;
        }
        return test;
        }, this);

    this.escaped += missed;
    this.kills += killed;
}
Game.EntityManager.prototype.render = function EntityManager_render(){
    this.entities.map(function(entity) { entity.render(); });
    this.colliders.map(function(entity) { entity.render(); });
}
Game.EntityManager.prototype.getKills = function EntityManager_getKills(){
    return this.kills;
}
Game.EntityManager.prototype.getTotalProjectileCount = function EntityManager_getTotalProjectileCount(){
    return this.projectileTotalCount;
}
Game.EntityManager.prototype.getTotalEntitiesCount = function EntityManager_getTotalEntitiesCount(){
    return this.entitiesTotalCount;
}
Game.EntityManager.prototype.getCurrentMissed = function EntityManager_getCurrentMissed(){
    return this.escaped;
}