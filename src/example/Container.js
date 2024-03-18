import update from "immutability-helper";
import { useCallback, useState, useEffect } from "react";
import cardInfo from "../xlsxInfo/CardInfo.json";
import { Card } from "./Card.js";
const style = {
  width: "100%",
  display: "flex",
  overflow: "auto",
  border: "1px solid lightGray",
};
console.log(cardInfo);
export const Container = () => {

  const [cards, setCards] = useState([
    cardInfo.coconut,
    cardInfo.stone,
    cardInfo.coconut_half,
  ]);
  useEffect(() => {console.log(cards)});

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
  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.CardIndex}
        index={index}
        id={card.CardIndex}
        text={card.CardText}
        moveCard={moveCard}
      />
    );
  }, []);
  return (
    <>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
    </>
  );
};
