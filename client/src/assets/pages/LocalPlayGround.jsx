import React, { useState, useEffect } from "react";
import Line from "../components/Line";
import "../styles/LocalPlayGround.css";

function LocalPlayGround() {
  const [clickCount, setClickCount] = useState(1);
  const [isOdd, setOdd] = useState(false);
  const [matrix, setMatrix] = useState([
    [100, 100, 100],
    [100, 100, 100],
    [100, 100, 100],
  ]);
  const [isWon, setWon] = React.useState(false);
  const [lineCoords, setLineCoords] = React.useState("");

  const [cellState, setCellState] = useState({
    11: null,
    12: null,
    13: null,
    21: null,
    22: null,
    23: null,
    31: null,
    32: null,
    33: null,
  });

  const handleClick = () => {
    if (clickCount < 10) {
      setClickCount(clickCount + 1);
    }
  };

  useEffect(() => {
    if (clickCount % 2 === 0) {
      setOdd(false);
    } else {
      setOdd(true);
    }

    checkIfWin();
    function checkIfWin() {
      function checkRowSums(matrix) {
        for (let i = 0; i < matrix.length; i++) {
          const rowSum = matrix[i].reduce((sum, element) => sum + element, 0);
          if (rowSum === 0 || rowSum === 3) {
            if (i + 1 === 1) {
              setLineCoords("M10,75 L450,75");
            } else if (i + 1 === 2) {
              setLineCoords("M10,225 L450,225");
            } else if (i + 1 === 3) {
              setLineCoords("M10,375 L450,375");
            }

            return true;
          }
        }
        return false;
      }

      function checkColumnSums(matrix) {
        for (let j = 0; j < matrix[0].length; j++) {
          const columnSum = matrix.reduce((sum, row) => sum + row[j], 0);
          if (columnSum === 0 || columnSum === 3) {
            if (j + 1 === 1) {
              setLineCoords("M75,10 L75,450");
            } else if (j + 1 === 2) {
              setLineCoords("M225,10 L225,450");
            } else if (j + 1 === 3) {
              setLineCoords("M375,10 L375,450");
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
          setLineCoords("M10,10 L450,450");
        }

        if (diagonal2Sum === 0 || diagonal2Sum === 3) {
          setLineCoords("M430,10 L10,450");
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
        setWon(true);
      }
    }
  }, [clickCount]);

  const handleCellClick = (a, b) => {
    if (!isWon) {
      const _matrix = [...matrix];
      _matrix[a - 1][b - 1] = isOdd ? 0 : 1;
      setMatrix(_matrix);
      const _a = a.toString();
      const _b = b.toString();
      const cellIndex = _a + _b;
      if (cellState[cellIndex] === null) {
        const _cellState = { ...cellState };
        _cellState[cellIndex] = isOdd ? "circle" : "cross";
        setCellState(_cellState);
      }
    }
  };

  return (
    <main className="main-root-container">
      <div onClick={handleClick} className="playground-root">
        <div className="first-row rows">
          <div onClick={() => handleCellClick(1, 1)} className="one-one cells">
            <div style={{ display: cellState[11] ? "block" : "none" }}>
              <img src={`/images/${cellState[11]}.png`} alt="" />
            </div>
          </div>
          <div onClick={() => handleCellClick(1, 2)} className="one-two cells">
            <div style={{ display: cellState[12] ? "block" : "none" }}>
              <img src={`/images/${cellState[12]}.png`} alt="" />
            </div>
          </div>
          <div
            onClick={() => handleCellClick(1, 3)}
            className="one-three cells"
          >
            <div style={{ display: cellState[13] ? "block" : "none" }}>
              <img src={`/images/${cellState[13]}.png`} alt="" />
            </div>
          </div>
        </div>

        <div className="second-row rows">
          <div onClick={() => handleCellClick(2, 1)} className="two-one cells">
            <div style={{ display: cellState[21] ? "block" : "none" }}>
              <img src={`/images/${cellState[21]}.png`} alt="" />
            </div>
          </div>
          <div onClick={() => handleCellClick(2, 2)} className="two-two cells">
            <div style={{ display: cellState[22] ? "block" : "none" }}>
              <img src={`/images/${cellState[22]}.png`} alt="" />
            </div>
          </div>
          <div
            onClick={() => handleCellClick(2, 3)}
            className="two-three cells"
          >
            <div style={{ display: cellState[23] ? "block" : "none" }}>
              <img src={`/images/${cellState[23]}.png`} alt="" />
            </div>
          </div>
        </div>

        <div className="third-row rows">
          <div
            onClick={() => handleCellClick(3, 1)}
            className="three-one cells"
          >
            <div style={{ display: cellState[31] ? "block" : "none" }}>
              <img src={`/images/${cellState[31]}.png`} alt="" />
            </div>
          </div>
          <div
            onClick={() => handleCellClick(3, 2)}
            className="three-two cells"
          >
            <div style={{ display: cellState[32] ? "block" : "none" }}>
              <img src={`/images/${cellState[32]}.png`} alt="" />
            </div>
          </div>
          <div
            onClick={() => handleCellClick(3, 3)}
            className="three-three cells"
          >
            <div style={{ display: cellState[33] ? "block" : "none" }}>
              <img src={`/images/${cellState[33]}.png`} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="line-container">
        {isWon && <Line key={"random key"} lineCoords={lineCoords} />}
      </div>
    </main>
  );
}

export default LocalPlayGround;
