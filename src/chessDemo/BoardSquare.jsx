import React from "react";
import Square from "./Square";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./Constance";
import { canMoveKnight, moveKnight } from "./Game";
import { Overlay } from "./Overlay";

export default function BoardSquare({ x, y, children }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => moveKnight(x, y),
      canDrop: () => canMoveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y]
  );

  const black = (x + y) % 2 === 1;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      ref={drop}
    >
      <Square black={black}>{children}</Square>
      {isOver && canDrop && <Overlay color="green"></Overlay>}
      {!isOver && canDrop && <Overlay color="yellow"></Overlay>}
      {isOver && !canDrop && <Overlay color="red"></Overlay>}
    </div>
  );
}
