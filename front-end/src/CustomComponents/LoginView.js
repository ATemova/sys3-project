import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_input: {
        username: "", // Stores the username input
        password: "", // Stores the password input
        remember_me: false // Stores whether the "remember me" checkbox is checked
      },
      status: {
        success: null, // Indicates the success or failure of the login attempt
        msg: "" // Stores the status message
      }
    };
  }

  componentDidMount() {
    // Check if there are stored credentials in localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('remember_me');

    if (storedUsername && storedPassword && storedRememberMe) {
      this.setState({
        user_input: {
          username: storedUsername,
          password: storedPassword,
          remember_me: JSON.parse(storedRememberMe) // Parse stored "remember me" value from string to boolean
        }
      });
    }
  }

  QGetTextFromField = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        [e.target.name]: e.target.value // Use the input field's name attribute to update the corresponding state property
      }
    });
  }

  QToggleCheckbox = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        remember_me: e.target.checked // Update the remember_me property based on the checkbox state
      }
    });
  }

  QPostLogin = async () => {
    const { username, password, remember_me } = this.state.user_input;

    // Validate that username and password are not empty
    if (username === "" || password === "") {
      this.setState({ status: { success: false, msg: "Missing input field" } });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/login`, { username, password });

      if (response.status === 200) {
        this.setState({ status: response.data });

        // Store or clear credentials in localStorage based on "remember me" checkbox
        if (remember_me) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('remember_me', JSON.stringify(remember_me)); // Store remember_me as string
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('remember_me');
        }

        // Pass user data to parent component if a callback is provided
        if (this.props.QUserFromChild) {
          this.props.QUserFromChild(response.data.user);
        }
      } else {
        this.setState({ status: { success: false, msg: "Something went wrong, please try again." } });
      }
    } catch (err) {
      this.setState({ status: { success: false, msg: "An error occurred. Please try again." } });
      console.error(err);
    }
  }

  render() {
    const { user_input, status } = this.state;

    return (
      <div className="card" style={{ width: "400px", margin: "10px auto", padding: "20px" }}>
        <form>
          {/* Input for the username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              onChange={this.QGetTextFromField}
              type="text"
              className="form-control"
              value={user_input.username}
            />
          </div>
          {/* Input for the password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              onChange={this.QGetTextFromField}
              type="password"
              className="form-control"
              value={user_input.password}
            />
          </div>
          {/* Checkbox for "Remember me" */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              name="remember_me"
              backgroundColor="#003f5c"
              borderColor="#003f5c"
              onChange={this.QToggleCheckbox}
              checked={user_input.remember_me}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </form>
        <button
          style={{ marginTop: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}
          onClick={this.QPostLogin}
          className="btn btn-primary"
        >
          Log In
        </button>

        {status.success === true && status.msg && (
          <p className="alert alert-success" role="alert">
            {status.msg}
          </p>
        )}

        {status.success === false && status.msg && (
          <p className="alert alert-danger" role="alert">
            {status.msg}
          </p>
        )}
      </div>
    );
  }
}

export default LoginView;
