var mod = require('../modifiers');

module.exports =  {
	"totalSheep": 8,
	"requiredSheep": 2,
	"entrances": [{
		"x": 0,
		"z": 0,
		"dx": 1,
		"dz": 0
	}],
	"moves": [
		mod.turnLeft,
        mod.turnRight,
        mod.jump,
        mod.turnRight,
        mod.jump,
        mod.turnRight
	],
    "map": [
        [mod.entrance, mod.grass, mod.grass],
        [mod.none, mod.none, mod.grass],
        [mod.grass, mod.grass, mod.grass],
        [mod.grass, mod.none, mod.none],
        [mod.grass, mod.grass, mod.exit]
    ]
};