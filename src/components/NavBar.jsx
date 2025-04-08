import React, { useState } from "react";
import './NavBar.css';


function NavBar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const modes = ["cores", "partitions", "architecture", "gpu"];
  const [currentMode, setCurrentMode] = useState(null);

  const handleSelect = (mode) => {
    setCurrentMode(mode); // update current mode on select
    setMenuOpen(false); // close the menu
  };

  return (
    <>
      <div className="Navbar">
        <div className="Navbar-container">
	  	  <div className="hamburger-wrapper">
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                {modes.map((mode) => (
                  <div
                    key={mode}
                    className={`dropdown-item ${currentMode === mode ? "active" : ""}`}
                    onClick={() => handleSelect(mode)}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <h1 className="logo">Talapas Cluster Dashboard</h1>
          <div className="nav-opt">
          </div>
        </div>
      </div>
    </>
    );
}

export default NavBar;

