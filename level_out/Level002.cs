/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level002 () {
        sizeX = 5;
        sizeZ = 5;
        totalSheep = 5;
        requiredSheep = 4;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16, 32 };

        CreateCell (new IntVector3 (2, 0), 1);
        CreateCell (new IntVector3 (1, 1), 4);
        CreateCell (new IntVector3 (2, 1), 4);
        CreateCell (new IntVector3 (3, 1), 4);
        CreateCell (new IntVector3 (0, 2), 2);
        CreateCell (new IntVector3 (1, 2), 4);
        CreateCell (new IntVector3 (2, 2), 4);
        CreateCell (new IntVector3 (3, 2), 4);
        CreateCell (new IntVector3 (4, 2), 1);
        CreateCell (new IntVector3 (1, 3), 4);
        CreateCell (new IntVector3 (2, 3), 4);
        CreateCell (new IntVector3 (3, 3), 4);
        CreateCell (new IntVector3 (2, 4), 2);
        AddEntrance (new IntVector3 (2, 0), new IntVector3 (0, 1));
        AddEntrance (new IntVector3 (4, 2), new IntVector3 (-1, 0));
   }
}
