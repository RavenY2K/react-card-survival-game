import { render } from "react-dom";
import { Container } from "./components/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobileDevice } from "./utils/index.js";

function App() {
  console.log(isMobileDevice());
  return (
    <div className="App">
      <DndProvider backend={isMobileDevice() ? TouchBackend : HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
