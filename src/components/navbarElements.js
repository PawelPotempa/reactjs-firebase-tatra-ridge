import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  color: #bbb;
  background: #2e2e2e;
  font-weight: bold;
  letter-spacing: 0.025em;
  position: fixed;
  top: 0;
  z-index: 9999999;
`;

export const List = styled.ul`
  text-align: center;
  margin: 0;
`;

export const ListItem = styled.li`
  display: inline-block;
  line-height: 3em;
  width: 10em;

  :hover {
    background: #fff;
    cursor: pointer;
  }
`;
