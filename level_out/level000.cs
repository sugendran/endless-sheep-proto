/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level000 () {
        sizeX = 2;
        sizeZ = 2;
        cells = new MazeCell[sizeX, sizeZ];


        CreateCell (new IntVector2 (0, 0), 1);
        CreateCell (new IntVector2 (1, 0), 3);
        CreateCell (new IntVector2 (0, 1), 0);
        CreateCell (new IntVector2 (1, 1), 2);
   }
}
