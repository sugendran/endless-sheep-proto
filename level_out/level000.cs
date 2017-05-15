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
        moves = new List<int>() { 8, 16, 32 };

        CreateCell (new IntVector3 (0, 0), 1);
        CreateCell (new IntVector3 (1, 0), 4);
        CreateCell (new IntVector3 (1, 1), 2);
        AddEntrance (new IntVector3 (0, 0), new IntVector3 (1, 0));
   }
}
