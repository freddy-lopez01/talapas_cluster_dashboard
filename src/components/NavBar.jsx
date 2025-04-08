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
          <h1 className="logo">Talapas Cluster Dashboard</h1>
          <div className="nav-opt">
          </div>
        </div>
      </div>
    </>
    );
}

export default NavBar;

