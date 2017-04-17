const fs = require("fs");
const path = require("path");
const indir = path.join(__dirname, "level_in");
const outdir = path.join(__dirname, "level_out");

function isJSON(filename) {
    return path.extname(filename) === ".json";
}

function convertFile(filename) {
    const basename = path.basename(filename, ".json")
    const infile = path.join(indir, filename);
    const outfile = path.join(outdir, basename + ".cs");
    const data = require(infile);
    const sizeZ = data.length;
    const sizeX = data[0].length;
    const level = basename.slice(-3);
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

`
    ];
    for (let z = 0; z < sizeZ; z++) {
        for (let x = 0; x < sizeX; x++) {
            const val = data[z][x];
            output.push(`        CreateCell (new IntVector2 (${x}, ${z}), ${val});`);
        }
    }
    output.push("   }\n}\n");

    fs.writeFileSync(outfile, output.join("\n"));
}

fs.readdir(indir, (err, files) => {
    if (err) throw err;
    files.filter(isJSON).map(convertFile);
});