/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level004 () {
        sizeX = 5;
        sizeZ = 5;
        totalSheep = 3;
        requiredSheep = 1;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16 };

        CreateCell (new IntVector3 (0, 0), 4);
        CreateCell (new IntVector3 (1, 0), 4);
        CreateCell (new IntVector3 (2, 0), 64);
        CreateCell (new IntVector3 (3, 0), 4);
        CreateCell (new IntVector3 (4, 0), 4);
        CreateCell (new IntVector3 (0, 1), 4);
        CreateCell (new IntVector3 (1, 1), 4);
        CreateCell (new IntVector3 (2, 1), 4);
        CreateCell (new IntVector3 (3, 1), 4);
        CreateCell (new IntVector3 (4, 1), 4);
        CreateCell (new IntVector3 (0, 2), 1);
        CreateCell (new IntVector3 (1, 2), 4);
        CreateCell (new IntVector3 (2, 2), 16);
        CreateCell (new IntVector3 (3, 2), 4);
        CreateCell (new IntVector3 (4, 2), 2);
        CreateCell (new IntVector3 (0, 3), 4);
        CreateCell (new IntVector3 (1, 3), 4);
        CreateCell (new IntVector3 (2, 3), 4);
        CreateCell (new IntVector3 (3, 3), 4);
        CreateCell (new IntVector3 (4, 3), 4);
        CreateCell (new IntVector3 (0, 4), 4);
        CreateCell (new IntVector3 (1, 4), 4);
        CreateCell (new IntVector3 (2, 4), 64);
        CreateCell (new IntVector3 (3, 4), 4);
        CreateCell (new IntVector3 (4, 4), 4);
        AddEntrance (new IntVector3 (0, 2), new IntVector3 (1, 0));
   }
}
