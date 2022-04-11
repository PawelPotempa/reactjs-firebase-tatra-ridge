import React, { useState } from "react";
import {
  MobileIcon,
  Nav,
  List,
  ListItem,
  IconContainer,
} from "./navbarElements";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <Nav>
      <IconContainer
        onClick={() => {
          setActive(!active);
        }}
      >
        <MobileIcon />
      </IconContainer>
      <List active={active}>
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
