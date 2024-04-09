/* eslint-disable no-unused-vars */
import { Container } from "./components/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobileDevice } from "./utils/index.js";
import { memo, useEffect, useRef, useState } from "react";
import './Card.css'; // 引入CSS文件

function App() {
  const btnRef = useRef(null);
  const [cards, setCards] = useState([
    { id: 1, cardName: "Card 1", order: 1 },
    { id: 2, cardName: "Card 2", order: 2 },
    { id: 3, cardName: "Card 3", order: 3 },
    { id: 4, cardName: "Card 4", order: 4 },
    { id: 5, cardName: "Card 5", order: 5 },
    { id: 6, cardName: "Card 6", order: 6 },
    // 其他卡片...
  ]);
  useEffect(() => {
    const btnStyle = btnRef.current.style;

    btnStyle.transition = "transform 0";

    setTimeout(() => {
      console.log('@transition1', btnStyle.transition )
      btnStyle.transform = "translate(20px,20px)";
    }, 0);

    setTimeout(() => {
      console.log('@transform', btnStyle.transform )
      btnStyle.transition = "transform 1s ease";
    }, 100);
    setTimeout(() => {
      console.log('@transition2', btnStyle.transition )

      btnStyle.transform = "translate(0px,0px)";
    }, 200)

    // setTimeout(() => {
    //   btnStyle.transform = "translate(0px,0px)";
    // }, 0);
  });
  function swapCards(index1, index2) {
    cards[0].order = 5;
    cards[4].order = -1;
    //刷新页面
    setCards([...cards]);
  }

  return (
    <div className="App">
      <button
        style={{ transition: "color 1s ease" }}
        ref={btnRef}
        onClick={() => swapCards(0, 1)}
      >
        Swap Cards
      </button>
      <button onClick={()=>setContent('et')}>content</button>
      <div style={{ display: "flex", flexFlow: "column" }}>
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
