import { useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { isMobileDevice } from "../utils/index";
import * as cardsInfo from "../cards";

export const Card = ({ card, index, moveCard, activeCard, setActiveCard }) => {
  const { cardName, cardID, cardText } = card;
  const ref = useRef(null);

  const [{ handlerId, hovered }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        hovered: monitor.isOver(),
      };
    },
    drop: (item) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const dropIndex = index;
      // Don't replace items with themselves
      if (dragIndex === dropIndex) return;
      moveCard(dragIndex, dropIndex);
    },
  });
  const [{ isDragging, canDrag }, drag, dragPreview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { cardID, index, originIndex: index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
    // end: (item, monitor) => {
    //   const didDrop = monitor.didDrop();
    //   if (!didDrop) {
    //     moveCard(item.index, item.originIndex);
    //   }
    // },
    canDrag: () => activeCard === null,
  });
  drag(drop(ref));

  const buttonGroup = useMemo(() => {
    const cardInfo = cardsInfo[cardName];
    const { useType, acceptItem } = cardInfo;
    if (activeCard === null) {
      // 如果没有选中的卡片，返回"使用"按钮
      return [
        <button key="use" onClick={() => setActiveCard(cardName)}>
          使用
        </button>,
      ];
    } else if (activeCard === cardName) {
      // 如果选中的卡片满足某个条件，返回"取消"按钮
      const arr = [
        <button key="cancel" onClick={() => setActiveCard(null)}>
          取消
        </button>,
      ];
      for (const item of useType) {
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
    } else if (acceptItem[activeCard] !== undefined) {
      // 如果选中的卡片满足其他条件，返回其他内容
      return [
        <button key="other">{acceptItem[activeCard].interactionName}</button>,
      ];
    }
  }, [activeCard, cardName, setActiveCard]);

  const activeStyle = useMemo(() => {
    const cardInfo = cardsInfo[cardName];
    const { acceptItem } = cardInfo;
    if (hovered) return { backgroundColor: "#f7f7f7" };
    if (activeCard === null) return { backgroundColor: "white" };
    if (activeCard === cardName) return { backgroundColor: "white" };
    if (acceptItem[activeCard] !== undefined)
      return { backgroundColor: "lightYellow" };
    if (canDrag) return { backgroundColor: "#dddddd" };
  }, [activeCard, canDrag, cardName, hovered]);

  return (
    <div
      ref={ref}
      style={{ ...style, ...activeStyle }}
      data-handler-id={handlerId}
    >
      {isDragging ? <div style={coverLayerStyle}></div> : null}
      {cardText}
      <div style={{ ...btnContainer }}>{buttonGroup}</div>
    </div>
  );
};

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
  borderRadius: 7,
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
  backgroundColor: "#dddddd",
  zIndex: 1,
  opacity: isMobileDevice() ? 0.6 : 1,
};
