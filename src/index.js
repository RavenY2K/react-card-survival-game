import React from "react";
import ReactDOM from "react-dom/client";
import Knight from "./chessDemo/knight.jsx";
import Square from "./chessDemo/square.jsx";
import Board from "./chessDemo/board.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    123
    {/* <Board knightPosition='1'></Board> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
