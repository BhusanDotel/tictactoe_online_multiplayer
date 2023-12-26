const boardData = require("../models/boardModel.js");

const turn = async (req, res) => {
  try {
    if (req.body) {
      const { a, b, roomcode, name } = req.body;
      if (roomcode && a && b && name) {
        const roomExists = await boardData.findOne({ roomCode: roomcode });
        if (roomExists) {
          if (roomExists.turn === name) {
            let isOdd = false;
            roomExists.clickcount = roomExists.clickcount + 1;
            if (roomExists.clickcount < 11) {
              if (roomExists.clickcount % 2 === 0) {
                isOdd = false;
              } else {
                isOdd = true;
              }

              if (isOdd) {
                roomExists.turn = roomExists.player2;
              } else {
                roomExists.turn = roomExists.player1;
              }

              const availableMatrix = roomExists.matrix;
              const _matrix = [...availableMatrix];
              _matrix[a - 1][b - 1] = isOdd ? 0 : 1;
              roomExists.matrix = _matrix;

              const _a = a.toString();
              const _b = b.toString();
              const cellIndex = _a + _b;

              if (roomExists[cellIndex] === null) {
                roomExists[cellIndex] = isOdd ? "circle" : "cross";
              }

              const matrix = roomExists.matrix;

              let winLineCoordsInitials;
              checkIfWin();
              async function checkIfWin() {
                function checkRowSums(matrix) {
                  for (let i = 0; i < matrix.length; i++) {
                    const rowSum = matrix[i].reduce(
                      (sum, element) => sum + element,
                      0
                    );
                    if (rowSum === 0 || rowSum === 3) {
                      if (i + 1 === 1) {
                        winLineCoordsInitials = "fr";
                      } else if (i + 1 === 2) {
                        winLineCoordsInitials = "sr";
                      } else if (i + 1 === 3) {
                        winLineCoordsInitials = "tr";
                      }

                      return true;
                    }
                  }
                  return false;
                }

                function checkColumnSums(matrix) {
                  for (let j = 0; j < matrix[0].length; j++) {
                    const columnSum = matrix.reduce(
                      (sum, row) => sum + row[j],
                      0
                    );
                    if (columnSum === 0 || columnSum === 3) {
                      if (j + 1 === 1) {
                        winLineCoordsInitials = "fc";
                      } else if (j + 1 === 2) {
                        winLineCoordsInitials = "sc";
                      } else if (j + 1 === 3) {
                        winLineCoordsInitials = "tc";
                      }

                      return true;
                    }
                  }
                  return false;
                }

                function checkDiagonalSums(matrix) {
                  const diagonal1Sum = matrix.reduce(
                    (sum, row, index) => sum + row[index],
                    0
                  );
                  const diagonal2Sum = matrix.reduce(
                    (sum, row, index) => sum + row[row.length - index - 1],
                    0
                  );

                  if (diagonal1Sum === 0 || diagonal1Sum === 3) {
                    winLineCoordsInitials = "fd";
                  }

                  if (diagonal2Sum === 0 || diagonal2Sum === 3) {
                    winLineCoordsInitials = "sd";
                  }

                  return (
                    diagonal1Sum === 0 ||
                    diagonal1Sum === 3 ||
                    diagonal2Sum === 0 ||
                    diagonal2Sum === 3
                  );
                }

                if (
                  checkRowSums(matrix) ||
                  checkColumnSums(matrix) ||
                  checkDiagonalSums(matrix)
                ) {
                  roomExists.winCoordsInitials = winLineCoordsInitials;
                  if (roomExists.turn !== roomExists.player1) {
                    roomExists.player1Score = roomExists.player1Score + 1;
                  } else {
                    roomExists.player2Score = roomExists.player2Score + 1;
                  }
                }
              }

              await roomExists.save();

              res.json("your turn registered");
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error handling the turn request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  turn,
};
