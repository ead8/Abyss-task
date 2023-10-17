import React, { useState } from "react";
import "./node.css";
import { FiEdit2 } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

interface Node {
  id: string;
  label: string;
  children: Node[];
}

interface NodeComponentProps {
  node: Node;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

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
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      label: newLabel,
      children: [],
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
    if (id === "root") return; // deleting the root node is not allowed
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
        <div className="node-input">
          <input
            value={editedLabel}
            placeholder="Category Name"
            onChange={(e) => setEditedLabel(e.target.value)}
          />
          <button onClick={saveEditedNode} className="tree ">
            <IoMdCheckmark className="mark" />
          </button>
        </div>
      ) : (
        <>
          <a className={`tree a ${node.id === "root" ? "root" : ""}`}>
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
          <p>What do want to create?</p>
          <div className="node-popup">
            <button className="popup-button" onClick={() => handleEdit()}>
              Category
            </button>
            <button className="popup-button ">Service</button>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="node-input">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
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