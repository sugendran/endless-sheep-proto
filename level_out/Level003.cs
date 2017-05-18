/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level003 () {
        sizeX = 7;
        sizeZ = 7;
        totalSheep = 20;
        requiredSheep = 10;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16, 16, 16, 16, 16, 16 };

        CreateCell (new IntVector3 (0, 0), 4);
        CreateCell (new IntVector3 (1, 0), 4);
        CreateCell (new IntVector3 (2, 0), 4);
        CreateCell (new IntVector3 (3, 0), 4);
        CreateCell (new IntVector3 (4, 0), 4);
        CreateCell (new IntVector3 (5, 0), 4);
        CreateCell (new IntVector3 (6, 0), 4);
        CreateCell (new IntVector3 (0, 1), 4);
        CreateCell (new IntVector3 (3, 1), 4);
        CreateCell (new IntVector3 (6, 1), 4);
        CreateCell (new IntVector3 (0, 2), 4);
        CreateCell (new IntVector3 (3, 2), 4);
        CreateCell (new IntVector3 (6, 2), 4);
        CreateCell (new IntVector3 (0, 3), 4);
        CreateCell (new IntVector3 (1, 3), 4);
        CreateCell (new IntVector3 (2, 3), 4);
        CreateCell (new IntVector3 (3, 3), 4);
        CreateCell (new IntVector3 (4, 3), 4);
        CreateCell (new IntVector3 (5, 3), 4);
        CreateCell (new IntVector3 (6, 3), 4);
        CreateCell (new IntVector3 (0, 4), 4);
        CreateCell (new IntVector3 (3, 4), 1);
        CreateCell (new IntVector3 (6, 4), 4);
        CreateCell (new IntVector3 (0, 5), 4);
        CreateCell (new IntVector3 (3, 5), 2);
        CreateCell (new IntVector3 (6, 5), 4);
        CreateCell (new IntVector3 (0, 6), 4);
        CreateCell (new IntVector3 (1, 6), 4);
        CreateCell (new IntVector3 (2, 6), 4);
        CreateCell (new IntVector3 (3, 6), 4);
        CreateCell (new IntVector3 (4, 6), 4);
        CreateCell (new IntVector3 (5, 6), 4);
        CreateCell (new IntVector3 (6, 6), 4);
        AddEntrance (new IntVector3 (3, 4), new IntVector3 (0, -1));
   }
}
