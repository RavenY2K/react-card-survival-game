0; /* eslint-disable no-unused-vars */
import { Container } from "./components/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobileDevice } from "./utils/index.js";
import { memo, useEffect, useRef, useState } from "react";
import "./Card.css"; // 引入CSS文件
import { object } from "prop-types";

function App() {
  const btnRef = useRef(null);
  const [cards, setCards] = useState([
    { id: 1, cardName: "Card 1", order: 1, obj: { value: 1 } },
    { id: 2, cardName: "Card 2", order: 2, obj: { value: 2 } },
    { id: 3, cardName: "Card 3", order: 3, obj: { value: 3 } },
    { id: 4, cardName: "Card 4", order: 4, obj: { value: 4 } },
    { id: 5, cardName: "Card 5", order: 5, obj: { value: 5 } },
    { id: 6, cardName: "Card 6", order: 6, obj: { value: 6 } },
    // 其他卡片...
  ]);
  const card = { id: 0, cardName: "Card 0", order: 0, obj: { value: 0 } };
  const btnStyle = btnRef.current?.style;
  const setBtn = (a, b) => {
    if (a === 0) {
      console.log("000");
      btnStyle.transition = "transform 6s ease";
      console.log(btnStyle.transition);
    } else {
      btnStyle.transition = "transform 0.1s ease";
    }
    btnStyle.transform = `translate(${a}px,${b}px)`;
  };
  //forceUpdate

  const [, forceUpdate] = useState(0);
  function swapCards(index1, index2) {
    // cards[1].order = 5;
    // cards[4].order = 3;
    //刷新页面
    setCards([...cards]);
  }

  return (
    <div className="App">
      <button ref={btnRef} onClick={() => swapCards(0, 1)}>
        Swap Cards
      </button>
      <button
        onClick={() => {
          cards[0].obj.value = 2;
          card.obj.value = 2;
          // forceUpdate(n=>n+1);
        }}
      >
        card 1 a.b =2
      </button>
      <button onClick={() => setBtn(0, 0)}>0,0</button>
      <button onClick={() => setBtn(20, 20)}>20,20</button>
      <button
        onClick={() => {
          setBtn(20, 20);
          setTimeout(() => {
            setBtn(0, 0);
          }, 0);
        }}
      >
        20,20
      </button>

      <TestCard card={card}> </TestCard>

      <div style={{ display: "flex", flexFlow: "column" }}>
        {cards.map((card) => (
          <div key={card.id} style={{ order: card.order }}>
            <TestCard card={card}></TestCard>
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

const TestCard = function TestCard({ card }) {
  // console.log(card.cardName, "TestCard--render");
  const [value, setAalue] = useState(0);

  const buttonClick = () => {
    setAalue(value + 1);
  };

  // console.log(card);
  return (
    <div onClick={buttonClick}>
      {card.cardName} {value} {card?.obj?.value}
    </div>
  );
};
export default App;
