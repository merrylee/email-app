import React from "react";
import styled from "styled-components";

const Viewer = styled.div`
  padding: 10px;
  grid-area: MessageList;

  h2 {
    font-size: 1.3em;
    padding-bottom: 7px;
    border-bottom: 1px solid #ccc;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #1a1ae8;
    text-decoration: underline;
    float: right;
    font-size: 15px;
  }
`;

const MessageViewer = ({email, onSelect}) => {
  //console.log("MessageViewer:" + email.sender);
  return (
    <Viewer>
      <button onClick={(e) => onSelect(null)}>Back</button>
      <h2>{email.subject}</h2>
      <p>{email.body}</p>
    </Viewer>
  );
};

export default MessageViewer;
