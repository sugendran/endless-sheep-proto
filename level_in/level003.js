var mod = require('../modifiers');

module.exports = {
	"totalSheep": 20,
	"requiredSheep": 10,
	"entrances": [{
		"x": 3,
		"z": 4,
		"dx": 0,
		"dz": -1
	}],
	"moves": [
		mod.turnLeft,
		mod.turnRight,
		mod.turnRight,
		mod.turnRight,
		mod.turnRight,
		mod.turnRight,
		mod.turnRight
	],
	"map": [
		[4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 4, 0, 0, 4],
		[4, 0, 0, 4, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 1, 0, 0, 4],
		[4, 0, 0, 2, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4]
	]
};