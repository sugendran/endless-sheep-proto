const fs = require("fs");
const path = require("path");
const indir = path.join(__dirname, "level_in");
const outdir = path.join(__dirname, "level_out");

function capitalise(str) {
    return str.substring(0,1).toUpperCase() + str.substr(1);
}

function isJSON(filename) {
    return path.extname(filename) === ".json";
}

function convertFile(filename) {
    const basename = path.basename(filename, ".json")
    const infile = path.join(indir, filename);
    const outfile = path.join(outdir, capitalise(basename + ".cs"));
    const data = require(infile);
    const sizeZ = data.map.length;
    const sizeX = data.map[0].length;
    const level = basename.slice(-3);
    const moves = data.moves.join(", ");
    let output = [
`/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level${level} () {
        sizeX = ${sizeX};
        sizeZ = ${sizeZ};
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { ${moves} };
`
    ];
    for (let z = 0; z < sizeZ; z++) {
        for (let x = 0; x < sizeX; x++) {
            const val = data.map[z][x];
            const rot = data.rotations[z][x];
            if (val !== 0)
                output.push(`        CreateCell (new IntVector2 (${x}, ${z}), ${val}, ${rot});`);
        }
    }
    for (let i=0, ii=data.entrances.length; i<ii; i++) {
        const val = data.entrances[i];
        output.push(`        AddEntrance (new IntVector2 (${val.x}, ${val.z}), new IntVector2 (${val.dx}, ${val.dz}));`);
    }

    output.push("   }\n}\n");

    fs.writeFileSync(outfile, output.join("\n"));
}

fs.readdir(indir, (err, files) => {
    if (err) throw err;
    files.filter(isJSON).map(convertFile);
});