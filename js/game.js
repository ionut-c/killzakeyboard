function Level(){
    this.waves = [];
    this.score = 0;
    this.time = 0;
    this.entityManager = new EntityManager();
    this.waveIndex = 0;
    this.over = false;
}
Level.prototype.addWave = function Level_addWave(wave){
    this.waves.push(wave);
}
Level.prototype.update = function Level_update(deltaTime){
    this.time += deltaTime;
    this.entityManager.update(deltaTime);
    var spawned = this.waves[this.waveIndex].getSpawned(deltaTime);
    if( spawned != null){ this.entityManager.addEntities(spawned); }
    
    if(this.waves[this.waveIndex].hasEnded()){
        this.waveIndex++;
        if(this.waveIndex == this.waves.length ){
            this.over = true;
            var raport = this.entityManager.getKills() / this.entityManager.getTotalEntitiesCount();
            alert("Level Ended, You killed  : " + (raport * 100).toFixed(2) + "% .");
            //console.profileEnd();
        }
    }
}
Level.prototype.render = function Level_render(){
    this.entityManager.render();
}
Level.prototype.getEntityManager = function Level_getEntityManger(){
    return this.entityManager;
}
Level.prototype.isOver = function Level_isOver(){
    return this.over;
}

function Wave( spawners, startOffset, endOffset){
    this.startOffset = startOffset;
    this.endOffset = endOffset;
    this.spawners = spawners;
    this.elapsedTime = 0;
    this.duration = Math.max(spawners.map( function (spawner) { return spawner.getDuration()}));
}
Wave.prototype.getSpawned = function Wave_getSpawned(deltaTime){
    this.elapsedTime += deltaTime;
    var tor = null;
    if( this.elapsedTime > this.startOffset){
        tor = this.spawners
            .map(function(spawner) {
                return spawner.getSpawned(deltaTime);})
            .filter(function(spawned) {
                return spawned != null;});
    }
    return tor;
}
Wave.prototype.hasEnded = function Wave_hasEnded(){
    if( this.elapsedTime > this.startOffset + this.duration + this.endOffset){
        return true;
    }
    return false;
}
