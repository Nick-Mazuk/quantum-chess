# Quantum Chess
It's chess, but quantum

## Board State Representation

The board state will be represented by a JSON string. For instance, the opening state will be represented by the following string:

```
[[["r",1],["n",1],["b",1],["q",1],["k",1],["b",1],["n",1],["r",1]],[["p",1],["p",1],["p",1],["p",1],["p",1],["p",1],["p",1],["p",1]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]],[["R",1],["N",1],["B",1],["Q",1],["K",1],["B",1],["N",1],["R",1]],[["P",1],["P",1],["P",1],["P",1],["P",1],["P",1],["P",1],["P",1]]]
```

The overall structure is an array of arrays. The entire board is an array with 8 arrays inside for each row. Each row array has 8 more arrays to represent each square. Each square is an array to represent the piece and it's probability percentage (e.g. `["N", 0.85]`). This percentage is between 0 and 1.

Blank spaces are represented by an empty array (`[]`).

The rows are structured top to bottom (black side to white side), and left to right.

Each piece has a specific character attached to it:

| Character | Piece |
| --- | --- |
| R | Rook |
| N | Knight |
| B | Bishop |
| K | King |
| Q | Queen |
| P | Pawn |

White pieces are uppercase while black pieces are lowercase.
