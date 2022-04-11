import styled from "styled-components";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
  width: 100%;
  color: #bbb;
  background: #2e2e2e;
  font-weight: bold;
  letter-spacing: 0.025em;
  position: fixed;
  top: 0;
  z-index: 999;
  height: 40px;
`;

export const MobileIcon = styled(FaBars)`
  color: white;
  z-index: 9999;
  font-size: 1.5rem;
  display: none;
  padding: 0.5rem;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const IconContainer = styled.div``;

export const List = styled.ul`
  margin-left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0.5rem;
  background-color: #2e2e2e;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.active === true ? "flex" : "none")};

    flex-direction: ${(props) => (props.active === true ? "column" : "row")};
    align-items: ${(props) => (props.active ? "flex-start" : "center")};
    list-style: none;
  }
`;

export const ListItem = styled.li`
  display: inline-block;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 0;
  }

  :hover {
    background: #fff;
    cursor: pointer;
  }
`;
