import React, { useState } from "react";
import "./Header.css";
import { SiMinutemailer } from "react-icons/si";
import { FiPlus, FiMinus } from "react-icons/fi";

interface HeaderProps {
  zoomPercentage: number;
  setZoomPercentage: React.Dispatch<React.SetStateAction<number>>;
  handleCenter: () => void;
}

const Header: React.FC<HeaderProps> = ({
  zoomPercentage,
  setZoomPercentage,
  handleCenter,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const zoomOptions = [25, 50, 75, 100, 125, 150];

  const handleZoomClick = (percentage: number) => {
    setZoomPercentage(percentage);
    setDropdownOpen(false);
  };

  return (
    <div className="header">
      <div className="left-side">
        <span className="service">Services</span>
        <span className="number">0</span>
      </div>
      <div className="right-side">
        <div className="list-view">LIST VIEW</div>
        <button
          onClick={() => handleCenter()}
          className="center"
          title="Go to Center"
        >
          <SiMinutemailer />
        </button>
        <div className="icon-container">
          <button
            className="icon"
            onClick={() => setZoomPercentage(Math.max(zoomPercentage - 10, 25))}
          >
            <FiMinus />
          </button>
          <div
            className="zoom-dropdown"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {zoomPercentage}%
            {isDropdownOpen && (
              <div className="dropdown-content">
                {zoomOptions.map((option) => (
                  <div key={option} onClick={() => handleZoomClick(option)}>
                    {option}%
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="icon"
            onClick={() =>
              setZoomPercentage(Math.min(zoomPercentage + 10, 150))
            }
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;