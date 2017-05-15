var mod = require('../modifiers');

module.exports = {
	"totalSheep": 3,
	"requiredSheep": 1,
	"entrances": [{
		"x": 0,
		"z": 0,
		"dx": 1,
		"dz": 0
	}],
	"moves": [
		mod.turnLeft,
		mod.turnRight,
		mod.jump
	],
	"map": [
		[mod.entrance, mod.grass],
		[mod.none, mod.exit]
	]
};