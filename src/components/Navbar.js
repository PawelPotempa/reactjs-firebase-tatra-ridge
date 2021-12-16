import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <Link to="/edit">Edit</Link>
        </li>

        <li>
          <Link to="/">Learn</Link>
        </li>
        <li>
          <Link to="/practice">Practice</Link>
        </li>
        <li>
          <Link to="/random-practice">Practice Game</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
