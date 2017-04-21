/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level000 () {
        sizeX = 2;
        sizeZ = 2;
        delta = new IntVector2 (1, 0);
        cells = new MazeCell[sizeX, sizeZ];


        CreateCell (new IntVector2 (0, 0), 2049);
        CreateCell (new IntVector2 (1, 0), 2052);
        CreateCell (new IntVector2 (1, 1), 2);
   }
}
