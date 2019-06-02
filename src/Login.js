import React from 'react';

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
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Enter your legacy access token to start
            <input type="password" ref={this.inputRef} />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
