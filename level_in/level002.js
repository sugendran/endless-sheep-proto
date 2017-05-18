var mod = require('../modifiers');

module.exports =  {
	"totalSheep": 5,
	"requiredSheep": 4,
	"entrances": [{
		"x": 2,
		"z": 0,
		"dx": 0,
		"dz": 1
	},{
		"x": 4,
		"z": 2,
		"dx": -1,
		"dz": 0
	}],
	"moves": [
		mod.turnLeft,
		mod.turnRight,
		mod.jump
	],
    "map": [
        [0, 0, 1,  0, 0],
        [0, 4, 4, 4, 0],
        [2, 4, 4,  4, 1],
		[0, 4, 4, 4, 0],
        [0, 0, 2,  0, 0],
    ]
};