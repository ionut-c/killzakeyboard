function getLevel(level, canvas, context){
    switch( level ){
    case 1:
	return LoadLevel1(canvas, context, level);
	break;
    case 2:
	return LoadLevel2(canvas, context, level);
	break;
    case 3:
	return LoadLevel3(canvas, context, level);
	break;
    default:
	throw "No level found";
    }
}
function LoadLevel1(canvas, context, id){
    var path = [{"x": canvas.width -1, "y": 30},
                {"x": 0           , "y": 30},
                {"x": 0           , "y": 30},
                {"x": -100        , "y": 30}];
    
    var path2 = [{"x": canvas.width, "y": canvas.height - 90},
                 {"x": 0           , "y": canvas.height - 90},
                 {"x": 0           , "y": canvas.height - 90},
                 {"x": -100        , "y": canvas.height - 90}];

    var spawner1 = new EnemySpawner(context, path, Bird, 1, 1000);
    //var spawner2 = new EnemySpawner(context, path2, Bird, 10, 1000);
    //var spawner3 = new EnemySpawner(context, path, Bird, 10, 1000);
    //var spawner4 = new EnemySpawner(context, path2, Bird, 10, 1000);
    
    var wave1 = new Wave( [spawner1], 0,5000);
    //var wave2 = new Wave( [spawner2], 0,0);
    //var wave3 = new Wave( [spawner3, spawner4], 0, 0);
    
    var level = new Level(id, canvas.width, canvas.height);
    level.addWave(wave1);
    //level.addWave(wave2);
    //level.addWave(wave3);

    return level;
}
function LoadLevel2(canvas, context, id){
    var path = [{"x": canvas.width, "y": 30},
                {"x": -100, "y": 0},
                {"x": canvas.width, "y": canvas.height},
                {"x": -100, "y": canvas.height}];
    
    var path2 = [{"x": canvas.width, "y": canvas.height - 94},
                 {"x": -100, "y": canvas.height},
                 {"x": canvas.width, "y": 0},
                 {"x": -100, "y": 30 }];
    
    
    var spawner1 = new EnemySpawner(context, path, Bird, 10, 1000);
    var spawner2 = new EnemySpawner(context, path2, Bird, 10, 1000);
    
    var wave1 = new Wave( [spawner1], 0,0);
    var wave2 = new Wave( [spawner2], 1000, 0);
    
    var level = new Level(id, canvas.width, canvas.height);
    level.addWave(wave1);
    level.addWave(wave2);

    return level;
}
function LoadLevel3(canvas, context, id){
    var path = [{"x": canvas.width, "y": 30},
                {"x": -100, "y": 0},
                {"x": canvas.width, "y": canvas.height},
                {"x": -100, "y": canvas.height}];
    
    var path2 = [{"x": canvas.width, "y": canvas.height - 94},
                 {"x": -100, "y": canvas.height},
                 {"x": canvas.width, "y": 0},
                 {"x": -100, "y": 30 }];

    var path3 = [{"x": canvas.width, "y": 30},
                 {"x": 0           , "y": 30},
                 {"x": 0           , "y": 30 },
                 {"x": -100        , "y": 30 }];
    
    var path4 = [{"x": canvas.width, "y": canvas.height - 94},
                 {"x": 0           , "y": canvas.height - 94},
                 {"x": 0           , "y": canvas.height - 94},
                 {"x": -100        , "y": canvas.height - 94}];

    var spawner1 = new EnemySpawner(context, path, Bird, 10, 1000);
    var spawner2 = new EnemySpawner(context, path2, Bird, 10, 1000);
    var spawner3 = new EnemySpawner(context, path3, Bird, 20, 500);
    var spawner4 = new EnemySpawner(context, path4, Bird, 20, 500);

    var wave1 = new Wave( [spawner1], 0,0);
    var wave2 = new Wave( [spawner2], 1000, 0);
    var wave3 = new Wave( [spawner3], 1000, 7000);
    
    var level = new Level(id, canvas.width, canvas.height);
    level.addWave(wave1);
    level.addWave(wave2);
    level.addWave(wave3);

    return level;
}
