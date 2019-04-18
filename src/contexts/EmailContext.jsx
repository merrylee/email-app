import React from "react";
import * as api from "../api/api";
import {withNotify} from "./NotificationContext";


const EmailContext = React.createContext();
const { Provider } = EmailContext;

class EmailProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emails: [],
      loading: false,
      currentEmail: null
    }

    this.timer = null;
  }

  componentWillMount() {
    if ( this.timer ) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  componentDidMount() {
    this.setState({loading: true});

    api.fetchEmails()
    .then((emails) => this.setState({loading: false, emails: emails}))
    .catch((e) => this.setState({loading: false, emails: null}))

    this.timer = setInterval(() => {
      api.fetchLatestEmails()
      .then((latestEmails) => {
        //console.log("EmailContext");
        //console.log(latestEmails);
        if ( latestEmails && latestEmails.length > 0 ) {
          let newEmails = [...this.state.emails, ...latestEmails];
          //console.log(newEmails);
          this.setState({emails: newEmails});
          this.props.notify("New mails received " + latestEmails.length);
        }
      })
    }, 3000);

    //console.log(this.props);
    //this.props.notify("안녕하세요");
  }

  handleSelect = (email) => {
    if ( email ) {
      console.log("onSelect: " + email.id + " " + email.sender);
    } else {
      console.log("onSelect: " + email);
    }
    this.setState({currentEmail: email});
  }

  render() {
    return (
      <Provider
        value={{
          emails: this.state.emails,
          loading: this.state.loading,
          onSelect: this.handleSelect,
          currentEmail: this.state.currentEmail
        }}
      >{this.props.children}</Provider>
    )
  }
}

const WrappingComponent = withNotify(EmailProvider);

export { WrappingComponent as EmailProvider, EmailContext };
