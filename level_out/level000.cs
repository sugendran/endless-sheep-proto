/* Generated from JSON */
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public partial class Maze {

    public void Level000 () {
        sizeX = 2;
        sizeZ = 2;
        totalSheep = 3;
        requiredSheep = 1;
        cells = new MazeCell[sizeX, sizeZ];
        moves = new List<int>() { 8, 16 };

        CreateCell (new IntVector2 (0, 0), 1, 2048);
        CreateCell (new IntVector2 (1, 0), 4, 2048);
        CreateCell (new IntVector2 (1, 1), 2, 0);
        AddEntrance (new IntVector2 (0, 0), new IntVector2 (1, 0));
   }
}
