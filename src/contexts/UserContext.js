import React from "react";

const UserContext = React.createContext();
const {Consumer} = UserContext;

class UserProvider extends React.Component {
  state = {
    currentUser: null,
    showMenu: false
  };

  handleLogin = user => {
    this.setState({ currentUser: user });
  };

  handleLogout = () => {
    this.setState({ currentUser: null });
  };

  toggleManu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.currentUser,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export {UserProvider, Consumer as UserConsumer, UserContext};
