function makePaths(canvas) {
    var width = canvas.width - 1;
    var height = canvas.height - 1;
    var paths = [];
    
    paths[0] = [{"x": width, "y": 30},
		 {"x": 0    , "y": 30},
		 {"x": 0    , "y": 30},
                 {"x": -100 , "y": 30}];

    paths[1] = [{"x": width, "y": 30},
		 {"x": -100 , "y": 0},
		 {"x": width, "y": height},
		 {"x": -100 , "y": height}];

    paths[2] = [{"x": width, "y": height - 94},
		 {"x": -100 , "y": height},
		 {"x": width, "y": 0},
		 {"x": -100 , "y": 30 }];

    paths[3] = [{"x": width, "y": height - 94},
		 {"x": 0    , "y": height - 94},
		 {"x": 0    , "y": height - 94},
		 {"x": -100 , "y": height - 94}];
    
    return paths;
}

function getLevel(level, canvas, context){
    var paths = makePaths( canvas );
    switch( level ){
    case 1:
	return LoadLevel1(canvas, context, paths, level);
	break;
    case 2:
	return LoadLevel2(canvas, context, paths, level);
	break;
    case 3:
	return LoadLevel3(canvas, context, paths, level);
	break;
    default:
	throw "No level found";
    }
    return 0;
}
function LoadLevel1(canvas, context, paths, id){    
    var spawner1 = new EnemySpawner(context, paths[0], Bird, 10, 1000);
    var spawner2 = new EnemySpawner(context, paths[1], Bird, 10, 1000);
    var spawner3 = new EnemySpawner(context, paths[0], Bird, 10, 1000);
    var spawner4 = new EnemySpawner(context, paths[1], Bird, 10, 1000);
    
    var wave1 = new Wave( [spawner1], 0,8000);
    var wave2 = new Wave( [spawner2], 0,0);
    var wave3 = new Wave( [spawner3, spawner4], 0, 0);
    
    var level = new Level(id, canvas.width, canvas.height);
    level.addWave(wave1);
    //level.addWave(wave2);
    //level.addWave(wave3);

    return level;
}
function LoadLevel2(canvas, context, paths, id){    
    var spawner1 = new EnemySpawner(context, paths[2], Bird, 10, 1000);
    var spawner2 = new EnemySpawner(context, paths[3], Bird, 10, 1000);
    
    var wave1 = new Wave( [spawner1], 0,0);
    var wave2 = new Wave( [spawner2], 0, 8000);
    
    var level = new Level(id, canvas.width, canvas.height);
    level.addWave(wave1);
    level.addWave(wave2);

    return level;
}
function LoadLevel3(canvas, context, paths, id){
    var spawner1 = new EnemySpawner(context, paths[0], Bird, 10, 1000);
    var spawner2 = new EnemySpawner(context, paths[1], Bird, 10, 1000);
    var spawner3 = new EnemySpawner(context, paths[2], Bird, 20, 500);
    var spawner4 = new EnemySpawner(context, paths[3], Bird, 20, 500);

    var wave1 = new Wave( [spawner1], 0,0);
    var wave2 = new Wave( [spawner2], 1000, 0);
    var wave3 = new Wave( [spawner3], 1000, 8000);
    
    var level = new Level(id, canvas.width, canvas.height);
    level.addWave(wave1);
    level.addWave(wave2);
    level.addWave(wave3);

    return level;
}
