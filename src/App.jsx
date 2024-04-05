/* eslint-disable no-unused-vars */
import { Container } from "./components/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobileDevice } from "./utils/index.js";

function App() {
  return (
    <div className="App">
      <DndProvider backend={isMobileDevice() ? TouchBackend : HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

export default App
