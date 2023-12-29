import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Room.css";
import { host } from "../utils/apiRoutes";
import { myBaseURL } from "../utils/apiRoutes";
import { createRoomRoute, deleteRoomRoute } from "../utils/apiRoutes";
import hashCode from "../utils/hashCodeGenerator";
import io from "socket.io-client";

const socket = io.connect(host);

function Room() {
  const _showName = localStorage.getItem("showName") || "";
  const _name = localStorage.getItem("name" || "");
  const [rooomURL, setRoomURL] = useState(null);
  const [isCreating, setCreating] = useState(false);
  const [showName, setShowName] = useState(_showName);
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const [hashcode, setHashCode] = useState(hashCode);

  const handleName = (e) => {
    const _name = e.target.value;
    setShowName(_name);
  };

  useEffect(() => {
    if (showName) {
      setName(showName + "#" + hashcode);
    }
  }, [showName]);

  useEffect(() => {
    socket.on("roomCode", (code) => {
      const roomCode = localStorage.getItem("roomCode");
      if (code === roomCode) {
        window.location.href = `${myBaseURL}/playonline/${code}`;
      }
    });
  }, [socket]);

  const createRoom = () => {
    if (name) {
      showName !== _showName ? localStorage.setItem("showName", showName) : "";
      name !== _name ? localStorage.setItem("name", name) : "";
      setCreating(true);
      axios.post(createRoomRoute, { name }).then((res) => {
        if (res.data) {
          setRoomURL(`${myBaseURL}/playonline/${res.data}`);
          localStorage.setItem("roomCode", res.data);
          const roomCodeIn = res.data;
          setCreating(false);
          axios.post(deleteRoomRoute, { roomCodeIn });
        }
      });
    }
  };

  const handleCopyClick = async () => {
    const textToCopy = document.getElementById("textToCopy").innerText;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const doNothing = () => {
    alert("Input Username");
  };

  return (
    <main className="room-main-container">
      <div className="room-content-container">
        <div className="room-name-input-container">
          <input
            value={showName}
            name="showName"
            onChange={handleName}
            className="room-name-input room-input"
            type="text"
            placeholder="Enter name "
          />
          <p className="hashtag-show_container">#{hashcode}</p>
        </div>

        <div className="room-buttons-container">
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
              rooomURL && (
                <div className="room-url-copy-container">
                  <p id="textToCopy" className="room-code">
                    {rooomURL}
                  </p>
                  <button onClick={handleCopyClick} className="copy-btn">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              )
            ) : (
              <p className="room-code">creating room....</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Room;
