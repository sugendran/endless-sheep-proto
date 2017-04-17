const TILE_SIZE = 60;
const HALF_TILE_SIZE = TILE_SIZE / 2;
const THIRD_TILE_SIZE = TILE_SIZE / 3;
const QUARTER_TILE_SIZE = TILE_SIZE / 4;
const TILES = 600 / TILE_SIZE;
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");


var ___cords = {}

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

for (let x = 0; x < TILES; x++) {
    for (let y = 0; y < TILES; y++) {
        map.set(COORD(x, y), {
            fill: "#FFFFFF",
            stroke: "#000000",
            grass: false
        });
    }
}

function addGrass(x, y) {
    map.set(COORD(x, y), {
        fill: "#00AA00",
        stroke: "#003300",
        grass: true
    });
    return addGrass;
}
addGrass(0, 1)(1, 1)(2, 1)(3, 1)(4, 1)(5, 1)(5, 2)
    (5, 3)(6, 3)(7, 3)(8, 3)(9, 3)(5, 4)(5, 5)
    (6, 5)(7, 5)(7, 6)(7, 7)(6, 7)(5, 7)(4, 7)(3, 7)
    (3, 6)(3, 5)(3, 4)(3, 3)(4, 3);
const entrance = COORD(0, 1);
const exit = COORD(9, 3);

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

var turn_right = new Modifier('\u21b1', (sheep) => sheep.turnRight());
var turn_left = new Modifier('\u21b0', (sheep) => sheep.turnLeft());

map.get(COORD(5, 1)).modifier = turn_right;
map.get(COORD(5, 5)).modifier = turn_left;
map.get(COORD(7, 5)).modifier = turn_right;
map.get(COORD(7, 7)).modifier = turn_right;
map.get(COORD(3, 7)).modifier = turn_right;
map.get(COORD(3, 3)).modifier = turn_right;

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
    var sheep = new Sheep(entrance.x, entrance.y, 1, 0);
    creatures.set(entrance, sheep);
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
    if (oldCoord === exit) {
        console.log("WIN");
        creatures.delete(oldCoord);
    }
    var newX = sheep.x + sheep.dx;
    var newY = sheep.y + sheep.dy;
    var newCoord = COORD(newX, newY);

    if ((map.has(newCoord) === false) || (map.get(newCoord).grass === false)) {
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
setInterval(moveSheeps, 1000);