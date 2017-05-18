/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level001 () {
        sizeX = 3;
        sizeZ = 5;
        totalSheep = 8;
        requiredSheep = 2;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16, 8, 16 };

        CreateCell (new IntVector3 (0, 0), 1);
        CreateCell (new IntVector3 (1, 0), 4);
        CreateCell (new IntVector3 (2, 0), 4);
        CreateCell (new IntVector3 (2, 1), 4);
        CreateCell (new IntVector3 (0, 2), 4);
        CreateCell (new IntVector3 (1, 2), 4);
        CreateCell (new IntVector3 (2, 2), 4);
        CreateCell (new IntVector3 (0, 3), 4);
        CreateCell (new IntVector3 (0, 4), 4);
        CreateCell (new IntVector3 (1, 4), 4);
        CreateCell (new IntVector3 (2, 4), 2);
        AddEntrance (new IntVector3 (0, 0), new IntVector3 (1, 0));
   }
}
