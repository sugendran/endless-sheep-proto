/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level001 () {
        sizeX = 3;
        sizeZ = 5;
        delta = new IntVector2 (1, 0);
        cells = new MazeCell[sizeX, sizeZ];


        CreateCell (new IntVector2 (0, 0), 2049);
        CreateCell (new IntVector2 (1, 0), 4);
        CreateCell (new IntVector2 (2, 0), 2064);
        CreateCell (new IntVector2 (2, 1), 4);
        CreateCell (new IntVector2 (0, 2), 1032);
        CreateCell (new IntVector2 (1, 2), 4);
        CreateCell (new IntVector2 (2, 2), 272);
        CreateCell (new IntVector2 (0, 3), 4);
        CreateCell (new IntVector2 (0, 4), 264);
        CreateCell (new IntVector2 (1, 4), 4);
        CreateCell (new IntVector2 (2, 4), 2);
   }
}
