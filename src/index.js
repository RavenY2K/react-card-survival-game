import { render } from "react-dom";
import { Container } from "./example/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

// 检测是否是移动设备
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

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
