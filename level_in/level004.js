var mod = require('../modifiers');

module.exports = {
	"totalSheep": 3,
	"requiredSheep": 1,
	"entrances": [{
		"x": 0,
		"z": 2,
		"dx": 1,
		"dz": 0
	}],
	"moves": [
		mod.turnLeft,
		mod.turnRight
	],
	"map": [
		[4, 4, 64, 4, 4],
		[4, 4, 4, 4, 4],
		[1, 4, 16, 4, 2],
		[4, 4, 4, 4, 4],
		[4, 4, 64, 4, 4]
	]
};