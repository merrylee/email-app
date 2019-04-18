import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import { EmailProvider } from "../contexts/EmailContext";

const Page = styled.main`
  display: grid;
  height: 100vh;
  grid-template-columns: 250px;
  grid-template-rows: 49px;
  grid-template-areas:
    "Header Header"
    "MessageList MessageList";
`;

const MainPage = ({ onLogout }) => (
  <Page className="MainPage">
    <EmailProvider>
      <Header />
      <MessageList />
    </EmailProvider>
  </Page>
);

export default MainPage;
