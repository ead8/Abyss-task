import { useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Tree from "./components/Tree";

function App() {
  const [zoomPercentage, setZoomPercentage] = useState(100);
  const treeRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 500, y: 150 });
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleCenter = () => {
    setPosition({
      x: 500,
      y: 200,
    });
  };

  const scaleFactor = zoomPercentage / 100;
  return (
    <div>
      <Header
        zoomPercentage={zoomPercentage}
        setZoomPercentage={setZoomPercentage}
        handleCenter={handleCenter}
      />
      <Tree
        zoomPercentage={zoomPercentage}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        position={position}
        dragging={dragging}
        scaleFactor={scaleFactor}
        treeRef={treeRef}
      />
    </div>
  );
}

export default App;