import React, { useState } from "react";
import NodeComponent from "./Node";
import "./tree.css";

interface Node {
  id: string;
  label: string;
  children: Node[];
}

interface TreeProps {
  zoomPercentage: number;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  position: {
    x: number;
    y: number;
  };
  dragging: boolean;
  scaleFactor: number;
  treeRef: React.RefObject<HTMLDivElement>;
}

const Tree: React.FC<TreeProps> = ({
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  position,
  dragging,
  scaleFactor,
  treeRef,
}) => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "root", label: "Categories", children: [] },
  ]);

  return (
    <div
      ref={treeRef}
      className="tree tree-container"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        transform: `scale(${scaleFactor})`,
        cursor: dragging ? "grabbing" : "grab",
        minWidth: "100%"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging when mouse leaves the component
    >
      <ul className="node-list tree ul">
        {nodes.map((node) => (
          <NodeComponent
            key={node.id}
            node={node}
            nodes={nodes}
            setNodes={setNodes}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tree;