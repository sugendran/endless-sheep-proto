/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level001 () {
        sizeX = 3;
        sizeZ = 5;
        totalSheep = 3;
        requiredSheep = 1;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16 };

        CreateCell (new IntVector2 (0, 0), 1);
        CreateCell (new IntVector2 (1, 0), 4);
        CreateCell (new IntVector2 (2, 0), 16);
        CreateCell (new IntVector2 (2, 1), 4);
        CreateCell (new IntVector2 (0, 2), 8);
        CreateCell (new IntVector2 (1, 2), 4);
        CreateCell (new IntVector2 (2, 2), 16);
        CreateCell (new IntVector2 (0, 3), 4);
        CreateCell (new IntVector2 (0, 4), 8);
        CreateCell (new IntVector2 (1, 4), 4);
        CreateCell (new IntVector2 (2, 4), 2);
        AddEntrance (new IntVector2 (0, 0), new IntVector2 (1, 0));
   }
}
