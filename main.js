function game(canvas) {
    "use strict";
	const ModifierNone = 0;
	const ModifierEntrance = 1;
	const ModifierExit = 2;
	const ModifierGrass = 4;
	const ModifierTurnLeft = 8;
	const ModifierTurnRight = 16;
	const ModifierJump = 32;

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
    

    function COORD(x, y) {
        var key = `${x}:${y}`;
        if (!___cords.hasOwnProperty(key)) {
            ___cords[key] = {
                x,
                y
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
            ctx.fillRect(coord.x * TILE_SIZE, coord.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeRect(coord.x * TILE_SIZE, coord.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeText(coord.x + "," + coord.y, (coord.x * TILE_SIZE), (coord.y * TILE_SIZE) + TILE_SIZE - QUARTER_TILE_SIZE);

            if (info.modifier) {
                info.modifier.draw(ctx, coord.x, coord.y);
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

    function Sheep(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.alive = true;
    }
    Sheep.prototype.draw = function(ctx) {
        ctx.strokeText(this.char(),
            (this.x * TILE_SIZE) + HALF_TILE_SIZE,
            (this.y * TILE_SIZE) + HALF_TILE_SIZE);
    };
    Sheep.prototype.char = function() {
        if (!this.alive) {
            return "X";
        } else if (this.dx > 0) {
            return '\u21a0';
        } else if (this.dx < 0) {
            return '\u219e';
        } else if (this.dy < 0) {
            return '\u219f';
        } else {
            return '\u21a1';
        }
    };
    Sheep.prototype.reverse = function() {
        if (this.dx !== 0) {
            this.dx = -this.dx;
        } else {
            this.dy = -this.dy;
        }
    };
    Sheep.prototype.turnRight = function() {
        if (this.dx === 0) {
            this.dx = -this.dy;
            this.dy = 0;
        } else {
            this.dy = this.dx;
            this.dx = 0;
        }
    };
    Sheep.prototype.turnLeft = function() {
        if (this.dx === 0) {
            this.dx = this.dy;
            this.dy = 0;
        } else {
            this.dy = -this.dx;
            this.dx = 0;
        }
    };

    function addSheep() {
        [...entrances].forEach(entrance => {
            if (creatures.has(entrance)) {
                return;
            }
            var dir = entranceDirections.get(entrance);
            var sheep = new Sheep(entrance.x, entrance.y, dir.dx, dir.dz);
            creatures.set(entrance, sheep);
        });
    }

    function adjustSheepLocation(coord, sheep) {
        var oldCoord = COORD(sheep.x, sheep.y);
        sheep.x = coord.x;
        sheep.y = coord.y;
        creatures.delete(oldCoord);
        creatures.set(coord, sheep);
    }

    function moveSheep(sheep) {
        var oldCoord = COORD(sheep.x, sheep.y);
        if (!sheep.alive) {
            creatures.delete(oldCoord);
            return;
        }
        if (map.get(oldCoord).modifier) {
            map.get(oldCoord).modifier.action(sheep);
        }
        if (exits.has(oldCoord)) {
            console.log("WIN: " + (++score));
            creatures.delete(oldCoord);
            return;
        }
        var newX = sheep.x + sheep.dx;
        var newY = sheep.y + sheep.dy;
        var newCoord = COORD(newX, newY);

        if (map.has(newCoord) === false) {
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
        [...creatures].forEach(([coord, sheep]) => moveSheep(sheep));
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
                var coord = COORD(x, y);
                var modifier = null;
                if ((val & ModifierTurnLeft) === ModifierTurnLeft) {
                    modifier = modifier_turn_left;
                } else if((val & ModifierTurnRight) === ModifierTurnRight) {
                    modifier = modifier_turn_right;
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
            entranceDirections.set(COORD(dir.x, dir.z), dir);
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

g.loadLevel({
	"entrances": [{
		"x": 1,
		"z": 0,
		"dx": 0,
		"dz": 1
	},{
		"x": 1,
		"z": 3,
		"dx": 0,
		"dz": -1
	}],
    "map": [
        [0, 1, 0],
        [0, 8, 2],
        [2, 8, 0],
        [0, 1, 0]
    ],
    "rotations": [
        [2048, 0, 2048],
        [0, 0, 0],
        [1024, 0, 256],
        [0, 0, 0]
    ]
});