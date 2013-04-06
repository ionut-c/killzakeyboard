var Game = Game || {};

Game.EnemySpawner = function EnemySpawner(context, path, enemyType, numbers, frequency) {
    this.elapsedTime = 0;
    this.spawnedEnemies = 0;
    this.frequency = frequency;
    this.path = path;
    this.context = context;
    this.enemyType = enemyType;
    this.numbers = numbers;
}
Game.EnemySpawner.prototype.getSpawned = function EnemySpawner_getSpawned(deltaTime){
    this.elapsedTime += deltaTime;
        if(this.elapsedTime >= this.frequency && this.spawnedEnemies < this.numbers) {
            this.spawnedEnemies++;
            this.elapsedTime = 0;
            return new this.enemyType(this.context, this.path);
        }
        return null;
}
Game.EnemySpawner.prototype.getDuration = function EnemySpawner_getDuration(){
    return (this.numbers + 1) * this.frequency;
}
Game.EnemySpawner.prototype.getEnemiesCount = function EnemySpawner_getEnemiesCount(){
    return this.numbers;
}