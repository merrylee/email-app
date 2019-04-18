import React from 'react';
import styled from 'styled-components';
import {Icon} from 'antd';

const { Provider, Consumer } = React.createContext();

const NotifyBox = styled.div`
  position: relative;

  > ul {
    position: absolute;
    top: 10px;
    right: 6px;
    z-index: 1;
    margin: 0;
    padding: 0;
    list-style: none;

    > li {
      position: relative;
      background: #fff;
      max-width: 300px;
      display: flex;
      padding: 10px;
      padding-right: 30px;
      border: 1px solid #ccc;
      margin-bottom: 5px;
      border-radius: 3px;

      > button {
        position: absolute;
        top: 3px;
        right: 3px;
        border: none;
        border-radius: 50%;
        background-color: #ccc;
        line-height: 0;
        width: 1em;
        height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
        outline: none;

        &:hover {
          background-color: #d32f2f;
        }
      }
    }
  }
`;

class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  addMessage = (text) => {
    this.setState((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random(),
          text,
          addedAt: new Date().getTime()
        }
      ]
    }));
  }

  delMessage = (id) => {
    this.setState((state) => ({
      messages: state.messages.filter((m) => m.id !== id)
    }));
  }

  render() {
    return (
      <Provider
        value={{
          message: this.state.messages,
          onUpdateMessage: this.addMessage,
          onRemoveMessage: this.delMessage
        }}
      >
        <NotifyBox className="notification-wrapper">
          <ul>
          {
            this.state.messages.map((message) => {
                return (
                  <li key={message.id}>
                    {message.text}
                    
                    <Icon type="close"
                      onClick={() => {
                        this.delMessage(message.id);
                      }} 
                    />
                  </li>
                )
              }
            )
          }
          </ul>
        </NotifyBox>
        {this.props.children}
      </Provider>
    )
  }
}

function withNotify(BaseComponent) {
  return function(props) {
    return (
      <Consumer>
        {({onUpdateMessage}) => {
          return <BaseComponent {...props} notify={onUpdateMessage} />
        }}
      </Consumer>
    )
  }
}

export { NotificationProvider, withNotify }