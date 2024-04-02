import { useMemo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { data } from "browserslist";
import { isMobileDevice } from "../utils/index";
import { writeFileXLSX } from "xlsx";

const style = {
  border: "1px solid lightGray",
  flex: "0 0 100px",
  width: "70px",
  margin: "3px",
  padding: "3px",
  backgroundColor: "white",
  cursor: "pointer",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: 16,
};
const btnContainer = {
  flex: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
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

export const Card = ({
  card,
  id,
  text,
  index,
  moveCard,
  activeCard,
  setActiveCard,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const dropIndex = index;
      // Don't replace items with themselves
      if (dragIndex === dropIndex) return;
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
    canDrag: () => {
      return activeCard === null
    }
  });
  drag(drop(ref));

  if(id ===8){
    console.log(card.CardText,card)
  }

  const buttonGroup = useMemo(() => {
    if (activeCard === null) {
      // 如果没有选中的卡片，返回"使用"按钮
      return [<button key="use" onClick={() => setActiveCard(card.CardName)}>使用</button>];
    } else if (activeCard === card.CardName ) {
      // 如果选中的卡片满足某个条件，返回"取消"按钮
      const arr = [<button key="cancel" onClick={() => setActiveCard(null)}>取消</button>];
      for (const item of card.UseType) {
        arr.unshift(
          <button
            onClick={() => {
              setActiveCard(null);
            }}
          >
            {item.actionText}
          </button>
        );
      }
      return arr;
    } else if(card.AcceptItem[activeCard] !== undefined){
      
      // 如果选中的卡片满足其他条件，返回其他内容
      return [<button key="other">{card.AcceptItem[activeCard].InteractionName}</button>];
    }
  }, [activeCard, card, setActiveCard]);

  const activeStyle = useMemo(() => {
    if(activeCard === null) return { backgroundColor: "white" }
    if(activeCard === card.CardName) return { backgroundColor: "#c4dfb8" } 
    if(card.AcceptItem[activeCard] !== undefined) return { backgroundColor: "lightYellow" }
    return { backgroundColor: "#dddddd" }
    
    //返回深灰色
    // return { backgroundColor: "#f0f0f0" }
  }, [activeCard, card]);

  return (
    <div ref={ref} style={{ ...style,...activeStyle }} data-handler-id={handlerId}>
      {isDragging ? <div style={coverLayerStyle}></div> : null}
      {text}
      <div style={{ ...btnContainer }}>
      {buttonGroup}
      </div>
    </div>
  );
};
