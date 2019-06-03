import React from 'react';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { loginUser } = this.props;
    const { current = {} } = this.inputRef;
    loginUser(current.value);
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.onSubmit} className="Login-form">
          <label className="Login-label">
            Enter your legacy access token to start
          </label>
          <input type="password" ref={this.inputRef} className="Login-password" />
          <input type="submit" className="Login-submit" />
        </form>
      </div>
    );
  }
}

export default Login;
