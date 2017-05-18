function game(canvas) {
    "use strict";
	const ModifierNone = 0;
	const ModifierEntrance = 1;
	const ModifierExit = 2;
	const ModifierGrass = 4;
	const ModifierTurnLeft = 8;
	const ModifierTurnRight = 16;
	const ModifierJump = 32;
    const ModifierStop = 64;

    const TILE_SIZE = 60;
    const HALF_TILE_SIZE = TILE_SIZE / 2;
    const THIRD_TILE_SIZE = TILE_SIZE / 3;
    const QUARTER_TILE_SIZE = TILE_SIZE / 4;
    const ctx = canvas.getContext("2d");
    let intervalTimer = 0;

    let ___cords = {}
    const entrances = new Set();
    const exits = new Set();
    const entranceDirections = new Map();
    let score = 0;
    

    function COORD(x, y, z) {
        var key = `${x}:${y}:${z}`;
        if (!___cords.hasOwnProperty(key)) {
            ___cords[key] = {
                x,
                y,
                z
            };
        }
        return ___cords[key];
    }

    const map = new Map();
    const creatures = new Map();

    function render() {
        ctx.font = QUARTER_TILE_SIZE + 'px monospaced';
        [...map].forEach(([coord, info]) => {
            ctx.fillStyle = info.fill;
            ctx.strokeStyle = info.stroke;
            ctx.fillRect(coord.x * TILE_SIZE, coord.z * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeRect(coord.x * TILE_SIZE, coord.z * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeText(coord.x + "," + coord.z, (coord.x * TILE_SIZE), (coord.z * TILE_SIZE) + TILE_SIZE - QUARTER_TILE_SIZE);

            if (info.modifier) {
                info.modifier.draw(ctx, coord.x, coord.z);
            }
        });
        ctx.font = HALF_TILE_SIZE + 'px monospaced';
        [...creatures].forEach(([coord, sheep]) => sheep.draw(ctx));
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function Modifier(icon, action) {
        this.icon = icon;
        this.action = action;
    }
    Modifier.prototype.draw = function(ctx, x, y) {
        ctx.strokeText(this.icon, (x * TILE_SIZE), (y * TILE_SIZE) + THIRD_TILE_SIZE);
    };

    var modifier_entrance = new Modifier('A', () => null);
    var modifier_exit = new Modifier('B', () => null);
    var modifier_turn_right = new Modifier('\u21b1', (sheep) => sheep.turnRight());
    var modifier_turn_left = new Modifier('\u21b0', (sheep) => sheep.turnLeft());
    var modifier_jump = new Modifier('J', (sheep) => sheep.jump());
    var modifier_stop = new Modifier('S', (sheep) => sheep.stop());

    function Sheep(x, z, dx, dz) {
        this.x = x;
        this.z = z;
        this.y = 0;
        this.dx = dx;
        this.dy = 0;
        this.dz = dz;
        this.alive = true;
    }
    Sheep.prototype.draw = function(ctx) {
        ctx.strokeText(this.char(),
            (this.x * TILE_SIZE) + HALF_TILE_SIZE,
            (this.z * TILE_SIZE) + HALF_TILE_SIZE);
    };
    Sheep.prototype.char = function() {
        if (!this.alive) {
            return "X";
        } else if (this.dx > 0) {
            return '\u21a0';
        } else if (this.dx < 0) {
            return '\u219e';
        } else if (this.dz < 0) {
            return '\u219f';
        } else {
            return '\u21a1';
        }
    };
    Sheep.prototype.reverse = function() {
        if (this.dx !== 0) {
            this.dx = -this.dx;
        } else {
            this.dz = -this.dz;
        }
    };
    Sheep.prototype.turnRight = function() {
        if (this.dx === 0) {
            this.dx = -this.dz;
            this.dz = 0;
        } else {
            this.dz = this.dx;
            this.dx = 0;
        }
    };
    Sheep.prototype.turnLeft = function() {
        if (this.dx === 0) {
            this.dx = this.dz;
            this.dz = 0;
        } else {
            this.dz = -this.dx;
            this.dx = 0;
        }
    };
    Sheep.prototype.jump = function () {
        this.dy = 1;
    };
    Sheep.prototype.stop = function() {
        this.dx = 0;
        this.dy = 0;
    };

    function addSheep() {
        [...entrances].forEach(entrance => {
            if (creatures.has(entrance)) {
                return;
            }
            var dir = entranceDirections.get(entrance);
            var sheep = new Sheep(entrance.x, entrance.z, dir.dx, dir.dz);
            creatures.set(entrance, sheep);
        });
    }

    function adjustSheepLocation(coord, sheep) {
        var oldCoord = COORD(sheep.x, sheep.y, sheep.z);
        sheep.x = coord.x;
        sheep.y = coord.y;
        sheep.z = coord.z;
        
        creatures.delete(oldCoord);
        creatures.set(coord, sheep);
    }

    function moveSheep(oldCoord, sheep) {
        if (!sheep.alive) {
            creatures.delete(oldCoord);
            return;
        }
        var moddy = null;
        if(map.get(oldCoord)) {
            moddy = map.get(oldCoord).modifier;
        }
        if (sheep.y > 0) {
            sheep.dy = -1;
        } else {
            sheep.dy = 0;
            if (moddy) {
                moddy.action(sheep);
            }
        }
        if (exits.has(oldCoord)) {
            console.log("WIN: " + (++score));
            creatures.delete(oldCoord);
            return;
        }
        var newX = sheep.x + sheep.dx;
        var newZ = sheep.z + sheep.dz;
        var newY = sheep.y + sheep.dy;
        var newCoord = COORD(newX, newY, newZ);
        var groundedCoord = COORD(newX, 0, newZ);

        if (map.has(groundedCoord) === false) {
            sheep.alive = false;
        } else if (creatures.has(newCoord)) {
            // need to reverse
            sheep.reverse();
            return;
        }
        adjustSheepLocation(newCoord, sheep);
    }

    var remainingSheep = 3;

    function moveSheeps() {
        [...creatures].forEach(([coord, sheep]) => moveSheep(coord, sheep));
        if (remainingSheep) {
            addSheep();
            remainingSheep--;
        }
    }

    function loadLevel(gameData) {
        clearInterval(intervalTimer);
        map.clear();
        creatures.clear();
        remainingSheep = 3;

        var mapWidth = gameData.map[0].length;
        var mapHeight = gameData.map.length;

        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                let val = gameData.map[y][x];
                if (val === 0) continue;
                var coord = COORD(x, 0, y);
                var modifier = null;
                if ((val & ModifierTurnLeft) === ModifierTurnLeft) {
                    modifier = modifier_turn_left;
                } else if((val & ModifierTurnRight) === ModifierTurnRight) {
                    modifier = modifier_turn_right;
                } else if((val & ModifierJump) === ModifierJump) {
                    modifier = modifier_jump;
                } else if((val & ModifierStop) === ModifierStop) {
                    modifier = modifier_stop;
                } else if((val & ModifierEntrance) === ModifierEntrance) {
                    modifier = modifier_entrance;
                    entrances.add(coord);
                } else if((val & ModifierExit) === ModifierExit) {
                    modifier = modifier_exit;
                    exits.add(coord);
                }
                map.set(coord, {
                    fill: "#00AA00",
                    stroke: "#003300",
                    grass: true,
                    modifier: modifier
                });
            }
        }
        for(let i=0,ii=gameData.entrances.length; i<ii; i++) {
            var dir = gameData.entrances[i];
            entranceDirections.set(COORD(dir.x, 0, dir.z), dir);
        }
        console.log("Level Loaded");
        intervalTimer = setInterval(moveSheeps, 1000);
    }

    return {
        loadLevel: loadLevel
    };
};

var g = game(
    document.getElementById("board")
)

var gameData = {
	"totalSheep": 3,
	"requiredSheep": 1,
	"entrances": [{
		"x": 1,
		"z": 0,
		"dx": 0,
		"dz": 1
	},{
		"x": 2,
		"z": 2,
		"dx": -1,
		"dz": 0
	}],
	"moves": [
		8,
		16
	],
    "map": [
        [0, 1, 0],
        [0, 32, 0],
        [2, 4, 1],
		[0, 4, 0],
        [0, 2, 0]
    ],
    "rotations": [
        [2048, 0, 2048],
        [0, 0, 0],
        [1024, 0, 256],
		[1024, 0, 256],
        [0, 0, 0]
    ]
};
var urlData = location.search.substr(1);
if(urlData !== "") {
    gameData = JSON.parse(decodeURIComponent(urlData));
}

g.loadLevel(gameData);