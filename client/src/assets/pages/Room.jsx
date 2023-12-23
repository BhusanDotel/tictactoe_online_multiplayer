import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "../styles/Room.css";
import "../styles/Transition.css";

function Room() {
  const _name = localStorage.getItem("name");
  const _code = localStorage.getItem("name") || "";
  const navigate = useNavigate();
  const [redirectLocalPlay, setRedirectLocalPlay] = useState(false);
  const [isJoinRoom, setJoinRoom] = useState(false);
  const [roomCodeIn, setRoomCodeIn] = useState(null);
  const [roomCodeGet, setRoomCodeGet] = useState(null);
  const [isCreating, setCreating] = useState(false);
  const [name, setName] = useState(_name);
  const transitionRef = useRef(null);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const createRoom = () => {
    if (name) {
      name !== _name ? localStorage.setItem("name", name) : "";
      setCreating(true);
      axios
        .post("http://localhost:3000/api/createroom", { name })
        .then((res) => {
          if (res.data) {
            setRoomCodeGet(res.data);
            localStorage.setItem("roomCode", res.data);
            setCreating(false);
          }
        });
    }
  };

  const joinRoom = () => {
    if (name && roomCodeIn) {
      name !== _name ? localStorage.setItem("name", name) : "";
      axios
        .post("http://localhost:3000/api/joinroom", { name, roomCodeIn })
        .then((res) => {
          if (res.data === "room is available") {
            _code !== roomCodeIn
              ? localStorage.setItem("roomCode", roomCodeIn)
              : "";
            setRedirectLocalPlay(true);
            setTimeout(() => {
              navigate("/playonline");
            }, 700);
          } else {
            alert(res.data);
          }
        });
    }
  };

  const cancelJoinRoom = () => {
    setJoinRoom(false);
  };
  const toggleJoinRoom = () => {
    setJoinRoom(!isJoinRoom);
  };
  const handleRoomCode = (e) => {
    setRoomCodeIn(e.target.value);
  };
  const doNothing = () => {};

  return (
    <main className="room-main-container">
      <div className="room-content-container">
        <div className="room-name-input-container">
          <input
            value={name}
            name="name"
            onChange={handleName}
            className="room-name-input room-input"
            type="text"
            placeholder="Enter name to play online"
          />
        </div>

        <div className="room-buttons-container">
          <div className="room-join-container">
            {!isJoinRoom && (
              <button
                onClick={name ? toggleJoinRoom : doNothing}
                className={`${
                  name ? "room-button" : "room-button disble-button"
                } `}
              >
                Join room
              </button>
            )}

            {isJoinRoom && (
              <div className="join-room-code-join-div">
                <input
                  onChange={name ? handleRoomCode : doNothing}
                  className="room-code-inpu room-input"
                  type="number"
                  placeholder="Enter room code"
                />
                {roomCodeIn ? (
                  <button
                    onClick={name ? joinRoom : doNothing}
                    className="room-button room-join-button"
                  >
                    Join
                  </button>
                ) : (
                  <button
                    onClick={name ? cancelJoinRoom : doNothing}
                    className="room-button room-join-cancel-button"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="room-create-container">
            <button
              onClick={name ? createRoom : doNothing}
              className={`${
                name ? "room-button" : "room-button disble-button"
              } `}
            >
              Create room
            </button>
            {!isCreating ? (
              roomCodeGet && <p className="room-code">{roomCodeGet}</p>
            ) : (
              <p className="room-code">creating room....</p>
            )}
          </div>
        </div>
      </div>

      <CSSTransition
        in={redirectLocalPlay}
        timeout={500}
        classNames="fade"
        nodeRef={transitionRef}
        unmountOnExit
      >
        <div className="localplay-transition" ref={transitionRef}></div>
      </CSSTransition>
    </main>
  );
}

export default Room;
