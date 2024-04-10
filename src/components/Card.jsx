import { useEffect, useMemo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { isMobileDevice } from "../utils/index";
import cardsInfo from "../cards/index.js";
import store from "../store/cardStore.js";
import { observer } from "mobx-react-lite";

export const Card = observer(({ card }) => {
  console.log(card.cardName, " render");
  const {
    activeCard,
    setActiveCard,
    moveCard,
    newCards,
    addedQuantityCards,
    useCard,
  } = store;
  const { cardName, cardText, quantity, order } = card;

  const dragAreaRef = useRef(null);
  //用于拖拽和移动动画
  const cardRef = useRef(null);
  const oldPositionRef = useRef(card);

  //移动后的动画
  useEffect(() => {
    // 计算新位置
    const newPosition = cardRef.current?.getBoundingClientRect();
    if (!newPosition) return;

    const oldPosition = oldPositionRef.current;
    oldPositionRef.current = newPosition;

    const dx = oldPosition.x - newPosition.x;
    const dy = oldPosition.y - newPosition.y;

    if (dx === 0 && dy === 0) return;

    const style = cardRef.current.style;

    style.transition = "transform 0s ease";
    style.transform = `translate(${dx}px, ${dy}px)`;

    setTimeout(() => {
      style.transition = "transform 0.4s ease ";
      style.transform = "translate(0,0)";
    }, 0);
  }, [cardName, order]);

  //useDrag
  const [{ isDragging }, drag, dragPreview] = useDrag(
    useMemo(
      () => ({
        type: ItemTypes.CARD,
        item: () => card,
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          // 同时使用会有多次渲染bug
          // canDrag: monitor.canDrag(),
        }),
        canDrag: () => activeCard === null,
      }),
      [card, activeCard]
    )
  );

  // useDrop
  const [{ handlerId, hovered }, drop] = useDrop(
    useMemo(
      () => ({
        accept: ItemTypes.CARD,
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
            hovered: monitor.isOver(),
          };
        },
        drop: (item) => {
          if (!dragAreaRef.current) return;
          const dragOrder = item.order;
          const dropOrder = order;
          // Don't replace items with themselves
          if (dragOrder === dropOrder) return;
          moveCard(item, card);
        },
      }),
      [card, order, moveCard]
    )
  );

  drag(drop(dragAreaRef));
  dragPreview(cardRef);

  // 按钮组
  const buttonGroup = useMemo(() => {
    const cardInfo = cardsInfo[cardName];
    const { useType, acceptItem } = cardInfo;

    // 如果没有选中的卡片，返回"使用"按钮
    if (activeCard === null) {
      return [
        <button key="use" onClick={() => setActiveCard(card)}>
          使用
        </button>,
      ];
    }
    // 如果是选中的卡片，返回"取消"按钮
    else if (activeCard === card) {
      const arr = [
        <button key="cancel" onClick={() => setActiveCard(null)}>
          取消
        </button>,
      ];

      //useType按钮
      for (const item of useType) {
        arr.unshift(
          <button
            key={item.actionName}
            onClick={() => {
              useCard(card, item);
              setActiveCard(null);
            }}
          >
            {item.actionText}
          </button>
        );
      }
      return arr;
    }
    // 如果选中的卡片可以交互，返回交互按钮
    else if (acceptItem[activeCard.cardName] !== undefined) {
      const action = acceptItem[activeCard.cardName];
      return [
        <button
          onClick={() => {
            store.interaction(card, action);
            setActiveCard(null);
          }}
          key="interact"
        >
          {action.interactionName}
        </button>,
      ];
    }
  }, [activeCard, card, cardName, setActiveCard, useCard]);

  //背景图片样式
  const bgImgStyle = useMemo(() => {
    const src = `src/assets/Img/${cardName}.png`;
    return { backgroundImage: ` url(${src})` };
  }, [cardName]);

  // 激活样式
  const activeStyle = useMemo(() => {
    if (newCards.includes(card.id)) return { backgroundColor: "#b2c8b2" };
    const cardInfo = cardsInfo[cardName];
    const { acceptItem } = cardInfo;
    //如果拖拽时悬浮在该卡片上，背景浅灰色
    if (hovered) return { backgroundColor: "#f4f4f4" };
    //如果没有激活卡片，背景默认白色
    if (activeCard === null) return { backgroundColor: "white" };
    //如果选中的卡片是该卡片，背景白色
    if (activeCard === card) return { backgroundColor: "white" };
    //如果选中的卡片可以交互，背景浅黄色
    if (acceptItem[activeCard.cardName] !== undefined)
      return { backgroundColor: "lightYellow" };
    //如果不可交互,背景灰色
    return { backgroundColor: "#dddddd" };
  }, [activeCard, card, cardName, hovered, newCards]);

  // 新增数量样式
  const addQuantityStyle = () => {
    if (addedQuantityCards.includes(card.id)) {
      return { fontSize: 18, color: "#666666" };
    } else return { fontSize: 12, color: "gray" };
  };

  return (
    <div ref={cardRef} style={{ ...cardWapper, order }}>
      <div
        style={{ ...style, ...activeStyle, ...bgImgStyle }}
        data-handler-id={handlerId}
      >
        {isDragging ? <div style={coverLayerStyle}></div> : null}
        <div style={{ ...titleStyle }}>{cardText} </div>
        <div style={{ ...quantityStyle, ...addQuantityStyle() }}>
          x{quantity}{" "}
        </div>
        <div
          style={{ width: "100%", height: 1, backgroundColor: "lightGray" }}
        ></div>
        <div ref={dragAreaRef} style={{ ...btnContainer }}>
          {buttonGroup}
        </div>
      </div>
    </div>
  );
});

const titleStyle = {
  fontSize: 16,
};
const quantityStyle = {
  transition: "font-size 0.3s ease",
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

const cardWapper = {
  border: "1px solid lightGray",
  flex: "0 0 100px",
  width: "70px",
  margin: "3px",
  padding: "3px",
  borderRadius: 7,
  cursor: "pointer",
};

const style = {
  height: "100%",
  transition: "background 0.3s ease ",
  backgroundColor: "white",
  position: "relative",
  background: "center/60px no-repeat",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: 16,
};
const btnContainer = {
  flex: "auto",
  width: "100%",
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
