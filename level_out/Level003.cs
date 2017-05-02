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

        CreateCell (new IntVector2 (0, 0), 1, 0);
        CreateCell (new IntVector2 (1, 0), 4, 0);
        CreateCell (new IntVector2 (2, 0), 4, 0);
        CreateCell (new IntVector2 (3, 0), 4, 0);
        CreateCell (new IntVector2 (4, 0), 4, 0);
        CreateCell (new IntVector2 (5, 0), 4, 0);
        CreateCell (new IntVector2 (6, 0), 1, 0);
        CreateCell (new IntVector2 (0, 1), 4, 0);
        CreateCell (new IntVector2 (1, 1), 4, 0);
        CreateCell (new IntVector2 (3, 1), 4, 0);
        CreateCell (new IntVector2 (5, 1), 4, 0);
        CreateCell (new IntVector2 (6, 1), 4, 0);
        CreateCell (new IntVector2 (0, 2), 4, 0);
        CreateCell (new IntVector2 (1, 2), 4, 0);
        CreateCell (new IntVector2 (2, 2), 4, 0);
        CreateCell (new IntVector2 (3, 2), 2, 0);
        CreateCell (new IntVector2 (4, 2), 4, 0);
        CreateCell (new IntVector2 (5, 2), 4, 0);
        CreateCell (new IntVector2 (6, 2), 4, 0);
        CreateCell (new IntVector2 (0, 3), 4, 0);
        CreateCell (new IntVector2 (2, 3), 4, 0);
        CreateCell (new IntVector2 (3, 3), 4, 0);
        CreateCell (new IntVector2 (4, 3), 4, 0);
        CreateCell (new IntVector2 (6, 3), 4, 0);
        CreateCell (new IntVector2 (0, 4), 4, 0);
        CreateCell (new IntVector2 (6, 4), 4, 0);
        CreateCell (new IntVector2 (0, 5), 4, 0);
        CreateCell (new IntVector2 (1, 5), 4, 0);
        CreateCell (new IntVector2 (2, 5), 4, 0);
        CreateCell (new IntVector2 (3, 5), 4, 0);
        CreateCell (new IntVector2 (4, 5), 4, 0);
        CreateCell (new IntVector2 (5, 5), 4, 0);
        CreateCell (new IntVector2 (6, 5), 4, 0);
        AddEntrance (new IntVector2 (0, 0), new IntVector2 (0, 1));
        AddEntrance (new IntVector2 (6, 0), new IntVector2 (-1, 0));
   }
}
