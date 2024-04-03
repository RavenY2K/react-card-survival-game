import { useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { isMobileDevice } from "../utils/index";
import * as cardsInfo from "../cards/index.js";

export const Card = ({
  card,
  index,
  moveCard,
  activeCard,
  setActiveCard,
  quantity,
}) => {
  const { cardName, cardID, cardText } = card;
  const ref = useRef(null);

  // useDrop
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

  //useDrag
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

  // 按钮组
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
      // 如果选中的卡片可以交互，返回交互按钮
      return [
        <button
          onClick={() => {
            setActiveCard(null);
          }}
          key="interact"
        >
          {acceptItem[activeCard].interactionName}
        </button>,
      ];
    }
  }, [activeCard, cardName, setActiveCard]);

  // 激活样式
  const activeStyle = useMemo(() => {
    const cardInfo = cardsInfo[cardName];
    const { acceptItem } = cardInfo;
    if (hovered) return { backgroundColor: "#f4f4f4" };
    if (activeCard === null) return { backgroundColor: "white" };
    if (activeCard === cardName) return { backgroundColor: "white" };
    if (acceptItem[activeCard] !== undefined)
      return { backgroundColor: "lightYellow" };
    if (canDrag) return { backgroundColor: "#dddddd" };
  }, [activeCard, canDrag, cardName, hovered]);

  return (
    <div
      ref={dragPreview}
      style={{ ...style, ...activeStyle }}
      data-handler-id={handlerId}
    >
      {isDragging ? <div style={coverLayerStyle}></div> : null}
      <div style={{ ...titleStyle }}>{cardText} </div>
      <div style={{ ...quantityStyle }}>x{quantity} </div>

      <div
        style={{ width: "100%", height: 1, backgroundColor: "lightGray" }}
      ></div>
      <div ref={ref} style={{ ...btnContainer }}>
        {buttonGroup}
      </div>
    </div>
  );
};
const titleStyle = {
  fontSize: 16,
};
const quantityStyle = {
  //隐藏

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  fontSize: 12,
  width: 20,
  fontWeight: 700,
  height: 20,
  right: -8,
  top: -8,
  color: "gray",
  borderRadius: "50%",
  border: "1px solid lightGray",
  zIndex: 2,
  backgroundColor: "#f1f1f1",
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
