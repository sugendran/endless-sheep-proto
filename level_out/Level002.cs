/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level002 () {
        sizeX = 3;
        sizeZ = 4;
        totalSheep = 3;
        requiredSheep = 1;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16 };

        CreateCell (new IntVector2 (1, 0), 1, 0);
        CreateCell (new IntVector2 (1, 1), 4, 0);
        CreateCell (new IntVector2 (0, 2), 2, 1024);
        CreateCell (new IntVector2 (1, 2), 8, 0);
        CreateCell (new IntVector2 (2, 2), 2, 256);
        CreateCell (new IntVector2 (1, 3), 1, 0);
        AddEntrance (new IntVector2 (1, 0), new IntVector2 (0, 1));
        AddEntrance (new IntVector2 (1, 3), new IntVector2 (0, -1));
   }
}
