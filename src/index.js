import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./chessDemo/Board";
import { observe } from "./chessDemo/Game.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
observe((knightPosition) => {
  root.render(<Board knightPosition={knightPosition}></Board>);
});

// ReactDOM.render(<Board knightPosition={knightPosition} />, root)
