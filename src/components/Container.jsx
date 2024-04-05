import update from "immutability-helper";
import { useCallback, useState } from "react";
import { Card } from "./Card.jsx";
import store from "../store/cardStore.js";
import { observer } from "mobx-react-lite"
// import cardsInfo from "../cards/index.js";

const style = {
  width: "100%",
  height: 240,
  display: "flex",
  flexFlow: "column wrap",
  justifyContent: "space-between",
  overflow: "auto",
  alignContent: "flex-start",
  border: "1px solid lightGray",
};

export const Container = observer(() => {

  return (
    <>
    <button onClick={()=>store.addCard('stone')}> 添加卡片</button>
    <button onClick={()=>store.removeCard('sharpened_stone')}> 移除卡片</button>
      <div style={style}> 
        {store.cards.map((card, i) => (
          <Card
            key={card.cardName+i}
            index={i}
            card={card}
            quantity={card.quantity}
          ></Card>
        ))}
      </div>
    </>
  );
}
)