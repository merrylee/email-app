import React from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const Menu = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ul {
    font-size: 16px;
    list-style: none;
    position: absolute;
    top: 35px;
    right: 5px;
    margin: 0;
    padding: 5px 0;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  li {
    cursor: pointer;
    display: block;
    padding: 3px 20px;

    &:hover {
      background-color: #e3eafd;
    }
  }

  .UserAvatar {
    height: 36px;
    border-radius: 50%;
  }
`;

class UserMenu extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.imgRef = React.createRef();
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.toggleMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.toggleMenu);
  }

  toggleMenu = e => {
    //console.log(e.target);

    if (e.target === this.imgRef.current) {
      this.setState({ showMenu: !this.state.showMenu });
    } else if (e.target !== this.menuRef.current) {
      this.setState({ showMenu: false });
    }
  };

  render() {
    const { user, onLogout } = this.context;

    return (
      <Menu className="UserMenu">
        <img
          ref={this.imgRef}
          className="UserAvatar"
          alt="User avatar"
          src={user.avatar}
        />
        {this.state.showMenu ? (
          <ul ref={this.menuRef}>
            <li onClick={onLogout}>Logout</li>
          </ul>
        ) : null}
      </Menu>
    );
  }
}

export default UserMenu;
