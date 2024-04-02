import update from "immutability-helper";
import { useCallback, useState, useEffect } from "react";
import { Card } from "./Card.js";
import cardsInfo from "../cards";

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

export const Container = () => {
  const [cards, setCards] = useState([
    {
      cardID: 2,
      cardName: "stone",
      cardText: "石头",
    },
    {
      cardID: 1,
      cardName: "husked_coconut",
      cardText: "青椰子",
    },
    { cardID: 10, cardName: "coconut_shell", cardText: "椰壳" },
    {
      cardID: 3,
      cardName: "heavy_stone",
      cardText: "大石头",
    },
    {
      cardID: 4,
      cardName: "coconut",
      cardText: "椰子",
    },
    { cardID: 8, cardText: "半个椰子", cardName: "coconut_half" },
  ]);
  const [activeCard, setActiveCard] = useState(null);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [dragIndex, 0, prevCards[hoverIndex]],
          [hoverIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <>
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.cardID}
            index={i}
            card={card}
            moveCard={moveCard}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          ></Card>
        ))}
      </div>
    </>
  );
};
