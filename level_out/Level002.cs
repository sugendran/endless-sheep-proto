/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level002 () {
        sizeX = 3;
        sizeZ = 5;
        totalSheep = 3;
        requiredSheep = 1;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16 };

        CreateCell (new IntVector2 (1, 0), 1);
        CreateCell (new IntVector2 (1, 1), 4);
        CreateCell (new IntVector2 (0, 2), 2);
        CreateCell (new IntVector2 (1, 2), 4);
        CreateCell (new IntVector2 (2, 2), 1);
        CreateCell (new IntVector2 (1, 3), 32);
        CreateCell (new IntVector2 (1, 4), 2);
        AddEntrance (new IntVector2 (1, 0), new IntVector2 (0, 1));
        AddEntrance (new IntVector2 (2, 2), new IntVector2 (0, -1));
   }
}
