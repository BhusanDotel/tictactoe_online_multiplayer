import React from "react";
import Home from "./assets/pages/Home";
import { Route, Routes } from "react-router-dom";
import LocalPlayGround from "./assets/pages/LocalPlayGround";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/playlocal" element={<LocalPlayGround />} />
    </Routes>
  );
}

export default App;
