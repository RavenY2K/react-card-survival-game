import update from "immutability-helper";
import { useCallback, useState, useEffect } from "react";
import cardInfo from "../xlsxInfo/CardInfo.json";
import { Card } from "./Card.js";
import {
  coconut_half,
  coconut_shell,
  coconut,
  heavy_stone,
  stone,
  husked_coconut,
} from "../cards";

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
    coconut_half,
    coconut_shell,
    coconut,
    heavy_stone,
    stone,
    husked_coconut,
  ]);
const [activeCard, setActiveCard] = useState(null);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
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
            key={card.CardIndex}
            index={i}
            card={card}
            id={card.CardIndex}
            text={card.CardText}
            moveCard={moveCard}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          ></Card>
        ))}
      </div>
    </>
  );
};
