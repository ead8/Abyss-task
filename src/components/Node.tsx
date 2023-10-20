import React, { useState } from "react";
import "./node.css";
import { FiEdit2 } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
interface Node {
  id: string;
  label: string;
  children: Node[];
  color?: string ; // Add a color property
}

interface NodeComponentProps {
  node: Node;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

const generateColor = (parentColor?: string) => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * 16);
    if (parentColor && parentColor.charAt(i) === "#") {
      color += letters[index];
    } else {
      color += parentColor ? parentColor.charAt(i) : letters[index];
    }
  }
  return color;
};


const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  nodes,
  setNodes,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [editedLabel, setEditedLabel] = useState(node.label);
  const [popup, setPopup] = useState(false);

  const addNode = () => {
    // Generate or assign a color to the new node based on the parent's color
    const newNode: Node = {
      id: Math.random().toString(36).substring(2, 9),
      label: newLabel,
      children: [],
      color: node.children.length > 0 ? node.children[0].color : generateColor(node.color), // Use the first child's color, if available
    };
  
    const updatedNodes = [...nodes];
    const targetNode = findNode(updatedNodes, node.id);
    if (targetNode) {
      targetNode.children.push(newNode);
    }
    setNodes(updatedNodes);
    setIsAdding(false);
  };
  

  const startEditing = () => {
    setIsEditing(true);
  };
  const handleEdit = () => {
    setIsAdding(true);
    setPopup(!popup);
  };

  const saveEditedNode = () => {
    const updatedNodes = [...nodes];
    const targetNode = findNode(updatedNodes, node.id);
    if (targetNode) {
      targetNode.label = editedLabel;
    }
    setNodes(updatedNodes);
    setIsEditing(false);
  };

  const findNode = (nodes: Node[], id: string): Node | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const childNode = findNode(node.children, id);
      if (childNode) return childNode;
    }
    return null;
  };

  const deleteNode = (id: string) => {
    const updatedNodes = [...nodes];
    if (id === "root") return; 
    removeNode(updatedNodes, id);
    setNodes(updatedNodes);
  };

  const removeNode = (nodes: Node[], id: string): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        nodes.splice(i, 1);
        return true;
      } else if (removeNode(nodes[i].children, id)) {
        return true;
      }
    }
    return false;
  };

  return (
    <li className="tree li ">
      {isEditing ? (
        <div >
          <input
            type="text"
            value={editedLabel}
            placeholder="Category Name"
            onChange={(e) => setEditedLabel(e.target.value)}
            className="node-input"
          />
          <button onClick={saveEditedNode} className="tree ">
            <IoMdCheckmark className="mark" />
          </button>
        </div>
      ) : (
        <>
          <a
            className={`tree a ${node.id === "root" ? "root" : ""}`}
            style={{ backgroundColor: node.color }} 
          >
            {node.label}
          </a>

          {node.id === "root" ? (
            <button className="tree button" onClick={() => setIsAdding(true)}>
              <FiPlus />
            </button>
          ) : (
            <>
              <button className="tree button" onClick={() => setPopup(!popup)}>
                <FiPlus />
              </button>
              <button className="tree button" onClick={startEditing}>
                <FiEdit2 />
              </button>
              <button
                className="tree button delete"
                onClick={() => deleteNode(node.id)}
              >
                <span>X</span>
              </button>
            </>
          )}
        </>
      )}

      {popup && (
        <div className="popup-container">
          <p>What do you want to create?</p>
          <div className="node-popup">
            <button className="popup-button" onClick={() => handleEdit()}>
              Category
            </button>
            <button className="popup-button">Service</button>
          </div>
        </div>
      )}

      {isAdding && (
        <div >
          <input
            placeholder="Category Name"
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="node-input"
          />
          <button className="tree button">
            <FiPlus />
          </button>
          <button onClick={addNode} className="tree mark">
            <IoMdCheckmark className="mark" />
          </button>
        </div>
      )}

      {node.children.length > 0 && (
        <ul className="tree ul">
          {node.children.map((child) => (
            <NodeComponent
              key={child.id}
              node={child}
              nodes={nodes}
              setNodes={setNodes}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NodeComponent;