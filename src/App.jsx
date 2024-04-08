/* eslint-disable no-unused-vars */
import { Container } from "./components/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobileDevice } from "./utils/index.js";
import { memo, useState } from "react";

function App() {
  const [cards, setCards] = useState([
    { id: 1, cardName: "Card 1", order: 1},
    { id: 2, cardName: "Card 2", order: 2 },
    { id: 3, cardName: "Card 3", order: 3 },
    { id: 4, cardName: "Card 4", order: 4 },
    { id: 5, cardName: "Card 5", order: 5 },
    { id: 6, cardName: "Card 6", order: 6}
    // 其他卡片...
  ]);
  function swapCards(index1, index2) {
    cards[0].order=5
    cards[4].order=-1
    //刷新页面
    setCards([...cards]);
    

    // setCards([...cards]);
    // setCards((prevCards) => {
    //   const newCards = [...prevCards];
    //   const temp = newCards[index1];
    //   newCards[index1] = newCards[index2];
    //   newCards[index2] = temp;
    //   return newCards;
    // });
  }

  return (
    <div className="App">
      <button onClick={() => swapCards(0, 1)}>Swap Cards</button>
      <div style={{ display: "flex" ,flexFlow:'column'}}>
        {cards.map((card) => (
          <div key={card.id} style={{ order: card.order }}>
            <TestCase text={card.cardName}></TestCase>
          </div>
        ))}
      </div>

      <DndProvider backend={isMobileDevice() ? TouchBackend : HTML5Backend}>
        <Container />
      </DndProvider>

      <Box></Box>
    </div>
  );
}

const Box = function Box({ text }) {
  // console.log("Box--render");
  return <div>{text}</div>;
};

const TestCase = memo(function TestCase({ text }) {
  const [value, setAalue] = useState(0);
  const buttonClick = () => {
    setAalue(value + 1);
  };
  // console.log("-----render");
  return (
    <div onClick={buttonClick}>
      {text} {value}
    </div>
  );
});
export default App;
