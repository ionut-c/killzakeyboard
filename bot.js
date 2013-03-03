function EntityManager(spawners) {
    
    var entities = [];
    var colliders = [];
    
    function addCollider(collider){
        //colliders.push(collider);
    }
    
    function update(deltaTime) {
        var spawned = spawners
            .map(function(spawner) { return spawner.update(deltaTime); })
            .filter(function(spawned) {
                return spawned != null;
            });
        entities = entities.concat(spawned) ;
        //entities = entities.filter(function(entity) {
        //    for(var i = 0, len = colliders.length; i < len; i++) {
        //        if(checkColRR(entity.getBoundingBox(), colliders[i].getBoundingBox())) {
        //            return false;
        //        }
        //    }
        //    return true;
        //});
        entities.map(function(entity) { entity.update(deltaTime); });
        //colliders.map(function(entity) { entity.update(deltaTime); });
    }
    
    function render(){
        entities.map(function(entity) { entity.render(); });
    }
    
    return {'update': update, "render": render, "addCollider": addCollider};
}


function EnemySpawner(context, path, enemy_type, numbers, frequency) {
    var elapsed_time = 0;
    var spawned_enemies = 0;
    
    function update(deltaTime) {
        elapsed_time += deltaTime;
        if(elapsed_time >= frequency && spawned_enemies < numbers) {
            spawned_enemies++;
            elapsed_time = 0;
            return new enemy_type(context, path);
        }
        return null;
    }
    
    return {'update': update};
}

BirdModel = new Model("http://www.iphonegametutorials.com/wp-content/uploads/2010/09/dragon.png", 75, 70, 10, 1, 1);

var Bird = function(context, path){
    this.model = new ModelObject(BirdModel, context);
    this.bounder = new Bounder("rect", Rect());
    this.walker = new PathWalker(path);
    this.speed = 10;
    
    this.walker.getStart();
}
Bird.prototype.update = function (deltaTime){
    if( !this.walker.atEnd()){
            this.model.setPosition(this.walker.getNext(this.speed));
        }
        this.model.update(deltaTime);
}
Bird.prototype.render = function (deltaTime){
    this.model.render();
}