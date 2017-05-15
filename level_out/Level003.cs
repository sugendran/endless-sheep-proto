/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level003 () {
        sizeX = 7;
        sizeZ = 6;
        totalSheep = 3;
        requiredSheep = 1;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 8, 8, 8, 8 };

        CreateCell (new IntVector3 (0, 0), 1);
        CreateCell (new IntVector3 (1, 0), 4);
        CreateCell (new IntVector3 (2, 0), 4);
        CreateCell (new IntVector3 (3, 0), 4);
        CreateCell (new IntVector3 (4, 0), 4);
        CreateCell (new IntVector3 (5, 0), 4);
        CreateCell (new IntVector3 (6, 0), 1);
        CreateCell (new IntVector3 (0, 1), 4);
        CreateCell (new IntVector3 (1, 1), 4);
        CreateCell (new IntVector3 (3, 1), 4);
        CreateCell (new IntVector3 (5, 1), 4);
        CreateCell (new IntVector3 (6, 1), 4);
        CreateCell (new IntVector3 (0, 2), 4);
        CreateCell (new IntVector3 (1, 2), 4);
        CreateCell (new IntVector3 (2, 2), 4);
        CreateCell (new IntVector3 (3, 2), 2);
        CreateCell (new IntVector3 (4, 2), 4);
        CreateCell (new IntVector3 (5, 2), 4);
        CreateCell (new IntVector3 (6, 2), 4);
        CreateCell (new IntVector3 (0, 3), 4);
        CreateCell (new IntVector3 (2, 3), 4);
        CreateCell (new IntVector3 (3, 3), 4);
        CreateCell (new IntVector3 (4, 3), 4);
        CreateCell (new IntVector3 (6, 3), 4);
        CreateCell (new IntVector3 (0, 4), 4);
        CreateCell (new IntVector3 (6, 4), 4);
        CreateCell (new IntVector3 (0, 5), 4);
        CreateCell (new IntVector3 (1, 5), 4);
        CreateCell (new IntVector3 (2, 5), 4);
        CreateCell (new IntVector3 (3, 5), 4);
        CreateCell (new IntVector3 (4, 5), 4);
        CreateCell (new IntVector3 (5, 5), 4);
        CreateCell (new IntVector3 (6, 5), 4);
        AddEntrance (new IntVector3 (0, 0), new IntVector3 (0, 1));
        AddEntrance (new IntVector3 (6, 0), new IntVector3 (-1, 0));
   }
}
