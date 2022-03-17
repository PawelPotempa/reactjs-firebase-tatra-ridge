import React from "react";
import { Nav, List, ListItem } from "./navbarElements";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Nav>
      <List>
        <ListItem>
          <Link to="/edit">Edit</Link>
        </ListItem>
        <ListItem>
          <Link to="/">Learn</Link>
        </ListItem>
        <ListItem>
          <Link to="/practice">Practice</Link>
        </ListItem>
        <ListItem>
          <Link to="/random-practice">Practice Game</Link>
        </ListItem>
      </List>
    </Nav>
  );
};

export default Navbar;
