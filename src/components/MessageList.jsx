import React, { useContext } from "react";
import styled from "styled-components";
import { EmailContext } from "../contexts/EmailContext";
import { UserContext } from "../contexts/UserContext";
import MessageViewer from "./MessageViewer";

const List = styled.div`
  grid-area: MessageList;
  padding: 10px;

  .no-messages {
    text-align: center;
    color: #999;
    margin-top: 40px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 10px 3px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: #f5f5f5;
    }

    &:active {
      transition: background 0.3s;
      background: #ebefff;
    }

    .sender {
      font-weight: bold;
    }

    .subject {
      font-weight: 400;
    }

    .preview {
      opacity: 0.6;
      font-size: 0.8em;
    }
  }
`;

const Email = ({ email, onSelect }) => {
  return (
    <li onClick={e => onSelect(email)}>
      <div className="sender">{email.sender}</div>
      <div className="subject">{email.subject}</div>
      <div className="preview">{email.preview}</div>
    </li>
  );
};

const MessageList = () => {
  const { user } = useContext(UserContext);
  const { emails, loading, onSelect, currentEmail } = useContext(EmailContext);

  return (
    <List className="MessageList">
      {loading ? (
        <div className="no-messeges">Now loading...</div>
      ) : emails == null || emails.length === 0 ? (
        <div className="no-messeges">
          Your mailbox is empty {user.firstName}!
        </div>
      ) : currentEmail ? (
        <MessageViewer email={currentEmail} onSelect={onSelect} />
      ) : (
        <div className="MessageList">
          <ul>
            {emails.map(email => (
              <Email key={email.id} email={email} onSelect={onSelect} />
            ))}
          </ul>
        </div>
      )}
    </List>
  );
};

export default MessageList;
