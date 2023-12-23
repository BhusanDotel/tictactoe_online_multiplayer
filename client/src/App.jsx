import React from "react";
import Home from "./assets/pages/Home";
import { Route, Routes } from "react-router-dom";
import LocalPlayGround from "./assets/pages/LocalPlayGround";
import OnlinePlayGround from "./assets/pages/OnlinePlayGround";
import Room from "./assets/pages/Room";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/playlocal" element={<LocalPlayGround />} />
      <Route path="/room" element={<Room />} />
      <Route path="/playonline" element={<OnlinePlayGround />} />
    </Routes>
  );
}

export default App;
