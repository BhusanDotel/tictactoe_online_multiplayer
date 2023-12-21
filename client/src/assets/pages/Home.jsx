import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../styles/Home.css";
import "../styles/Transition.css";

function Home() {
  const navigate = useNavigate();
  const [redirectLocalPlay, setRedirectLocalPlay] = useState(false);
  const transitionRef = useRef(null);

  const NavigateToLocalPlay = () => {
    setRedirectLocalPlay(true);
    setTimeout(() => {
      navigate("/playlocal");
    }, 700);
  };

  const NavigateToCreateRoom = () => {
    setRedirectLocalPlay(true);
    setTimeout(() => {
      navigate("/createroom");
    }, 700);
  };

  return (
    <div className="home-main-container">
      <div className="home-buttons-container">
        <button
          onClick={NavigateToLocalPlay}
          className="home-button localplay-button"
        >
          Play Local with friend
        </button>
        <button
          onClick={NavigateToCreateRoom}
          className="home-button create-room-button"
        >
          Create room
        </button>
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
    </div>
  );
}

export default Home;
