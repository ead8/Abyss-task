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

  const zoomOptions = [25,30,40, 50,60,70,80,90, 100, 125, 150];

  const handleZoomClick = (percentage: number) => {
    setZoomPercentage(percentage);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__left-side">
        <span className="header__service">Services</span>
        <span className="header__number">0</span>
      </div>
      <div className="header__right-side">
        <div className="header__list-view">LIST VIEW</div>
        <button
          onClick={handleCenter}
          className="header__center"
        >
          <SiMinutemailer />
          <div className="header__center-popup">
          <p>Go to Center</p>
        </div>
        </button>
        <div className="header__icon-container">
          <button
            className="header__icon "
            onClick={() => setZoomPercentage(Math.max(zoomPercentage - 10, 25))}
          >
            <FiMinus />
          </button>
          <div
            className={`header__zoom-dropdown${
              isDropdownOpen ? " header__zoom-dropdown--open" : ""
            }`}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {zoomPercentage}%
            {isDropdownOpen && (
              <div className="header__dropdown-content">
                {zoomOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleZoomClick(option)}
                  >
                    {option}%
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="header__icon "
            onClick={() => setZoomPercentage(Math.min(zoomPercentage + 10, 150))}
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
