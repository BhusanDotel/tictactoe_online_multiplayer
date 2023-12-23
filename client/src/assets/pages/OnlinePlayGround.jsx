import React, { useState, useEffect } from "react";
import Line from "../components/Line";
import axios from "axios";

function OnlinePlayGround() {
  const roomCodeSaved = localStorage.getItem("roomCode");
  const [isWon, setWon] = useState(false);

  const lineCoords = {
    fr: "M10,75 L450,75",
    sr: "M10,225 L450,225",
    tr: "M10,375 L450,375",
    fc: "M75,10 L75,450",
    sc: "M225,10 L225,450",
    tc: "M375,10 L375,450",
    fd: "M10,10 L450,450",
    sd: "M430,10 L10,450",
  };

  const [winLineCoords, setWinLineCoords] = React.useState();

  const [cellState, setCellState] = useState({});

  const handleCellClick = async (a, b) => {
    const roomcode = roomCodeSaved;
    if (!isWon) {
      await axios
        .post("http://localhost:3000/api/turn", { a, b, roomcode })
        .then((res) => {
          if (res.data.room) {
            const _cellState = { ...cellState };
            _cellState[11] = res.data.room[11];
            _cellState[12] = res.data.room[12];
            _cellState[13] = res.data.room[13];
            _cellState[21] = res.data.room[21];
            _cellState[22] = res.data.room[22];
            _cellState[23] = res.data.room[23];
            _cellState[31] = res.data.room[31];
            _cellState[32] = res.data.room[32];
            _cellState[33] = res.data.room[33];
            setCellState(_cellState);
            if (res.data.room.winCoordsInitials) {
              setWon(true);
              setWinLineCoords(res.data.room.winCoordsInitials);
            }
          }
        });
    }
  };

  return (
    <main className="main-root-container">
      <div className="playground-root">
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
        {isWon && (
          <Line key={"random key"} lineCoords={lineCoords[winLineCoords]} />
        )}
      </div>
    </main>
  );
}

export default OnlinePlayGround;
