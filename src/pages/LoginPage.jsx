import React from "react";
import styled from "styled-components";
import * as api from "../api/api";
//import PropTypes from "prop-types";
import { Button, Input } from "antd";
import { UserContext } from "../contexts/UserContext";

const Page = styled.div`
  margin-top: 100px;

  form {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    margin: 0 auto;

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1em;
      font-weight: bold;
      font-size: 18px;
    }

    input {
      padding: 8px 6px;
      border: 1px solid #aaa;
      border-radius: 2px;
      font-size: 14px;

      &:focus {
        outline: none;
        border: 1px solid #3257ff;
      }
    }
  }

  .error {
    background: #ffebee;
    color: #c62828;
    padding: 5px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 1em;
  }
`;

class LoginPage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: "",
      password: "",
      error: null
    };

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const username = this.usernameRef.current.value;
    const password = this.passwordRef.current.value;
    console.log("a: " + this.usernameRef.current);
    console.log("input: " + username);

    e.preventDefault();

    this.setState({ loading: true, error: null });

    api
      .login(username, password)
      .then(user => {
        this.context.onLogin(user);
      })
      .catch(error => this.setState({ error, loadign: false }));
  };

  render() {
    const { error } = this.state;

    return (
      <Page className="LoginPage" onSubmit={this.handleSubmit}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <Input name="username" type="text" ref={this.usernameRef} placeholder="Username"/>
          </label>
          <label>
            Password
            <Input name="password" type="password" ref={this.passwordRef} placeholder="Password"/>
          </label>
          {error && <div className="error">{error.message}</div>}
          <Button type="primary" htmlType="submit" size="large" loading={this.state.loading}>
            Sign In
          </Button>
        </form>
      </Page>
    );
  }
}

// LoginPage.propTypes = {
//   onLogin: PropTypes.func.isRequired
// };

export default LoginPage;
