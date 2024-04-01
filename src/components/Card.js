import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { data } from "browserslist";
import { isMobileDevice } from "../utils/index";

const style = {
  border: "1px solid lightGray",
  margin: "4px",
  flex: "0 0 60px",
  height: "80px",
  width: "80px",
  boxSizing: "border-box",
  padding: "3px",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "pointer",
  position: "relative",
};
const coverLayerStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "#c4dfb8",
  zIndex: 1,
  opacity: isMobileDevice() ? 0.7 : 1,
};

export const Card = ({ id, text, index, moveCard }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    // drop: (item, monitor) => {
    //   const dragIndex = item.index;
    //   const dropIndex = index;
    //   console.log(dragIndex, dropIndex);
    //   if (dragIndex === dropIndex) {
    //     return;
    //   }
    //   moveCard(dragIndex, dropIndex);
    // },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const dropIndex = index;
      // Don't replace items with themselves
      if (dragIndex === dropIndex) return;
      // // Determine rectangle on screen
      //      // Determine rectangle on screen
      // const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // // Get vertical middle
      // const hoverMiddleY =
      //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // // Determine mouse position
      // const clientOffset = monitor.getClientOffset();
      // // Get pixels to the top
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // // Only perform the move when the mouse has crossed half of the items height
      // // When dragging downwards, only move when the cursor is below 50%
      // // When dragging upwards, only move when the cursor is above 50%
      // // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }
      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }
      // Time to actually perform the action
      moveCard(dragIndex, dropIndex);
      item.index = dropIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index, originIndex: index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      console.log("end", item, monitor.didDrop());
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(item.index, item.originIndex);
      }
    },
  });
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style }} data-handler-id={handlerId}>
      {isDragging ? <div style={coverLayerStyle}></div> : null}
      {text}
    </div>
  );
};
