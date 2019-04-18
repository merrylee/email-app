import React, { useContext } from "react";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import { EmailContext } from "../contexts/EmailContext";

const GridHeader = styled.header`
  grid-area: Header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #9eb2fb;

  h2 {
    margin: 0;
    font-weight: 600;
    font-size: 20px;
    color: #44b;
  }
`;

const Header = () => {
  const { emails } = useContext(EmailContext);

  return (
    <GridHeader className="Header">
      <h2>MailBox ({emails.length})</h2>
      <UserMenu />
    </GridHeader>
  );
};

export default Header;
