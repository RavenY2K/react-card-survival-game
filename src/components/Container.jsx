import update from "immutability-helper";
import { useCallback, useState } from "react";
import { Card } from "./Card.jsx";
import store from "../store/cardStore.js";
import { observer } from "mobx-react-lite";
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
window.store = store;
export const Container = observer(() => {
  console.log("container render");
  return (
    <>
      <button
        onClick={() =>
          store.addCard({ cardText: "大石头", cardName: "heavy_stone" },2)
        }
      >
        {" "}
        添加卡片
      </button>
      <button onClick={() => store.removeCard(store.cards[0])}>移除卡片</button>
      <div style={style}>
        {store.cards.length > 6 ? <button style={btnStyle} onClick={store.sortCards}>整理</button> : null}
        {store.cards.map((card) => (
          <Card key={card.id} card={card}></Card>
        ))}
      </div>
    </>
  );
});
const btnStyle = {
  position: "absolute",
  width: 50,
  height: 30,
  opacity: 0.4,
  zIndex: 1000,
  right: 0,
};
