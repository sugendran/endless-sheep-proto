/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level001 () {
        sizeX = 3;
        sizeZ = 5;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16 };

        CreateCell (new IntVector2 (0, 0), 1, 2048);
        CreateCell (new IntVector2 (1, 0), 4, 0);
        CreateCell (new IntVector2 (2, 0), 16, 2048);
        CreateCell (new IntVector2 (2, 1), 4, 0);
        CreateCell (new IntVector2 (0, 2), 8, 1024);
        CreateCell (new IntVector2 (1, 2), 4, 0);
        CreateCell (new IntVector2 (2, 2), 16, 256);
        CreateCell (new IntVector2 (0, 3), 4, 0);
        CreateCell (new IntVector2 (0, 4), 8, 256);
        CreateCell (new IntVector2 (1, 4), 4, 0);
        CreateCell (new IntVector2 (2, 4), 2, 0);
        AddEntrance (new IntVector2 (0, 0), new IntVector2 (1, 0));
   }
}
