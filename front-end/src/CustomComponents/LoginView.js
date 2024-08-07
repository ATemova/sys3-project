import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      user_input: {
        username: "", // Stores the username input
        password: "", // Stores the password input
        remember_me: false // Stores whether the "remember me" checkbox is checked
      },
      user: null, // Stores user data after successful login
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
      // Populate state with stored credentials if available
      this.setState({
        user_input: {
          username: storedUsername,
          password: storedPassword,
          remember_me: JSON.parse(storedRememberMe)
        }
      });
    }
  }

  // Updates state with the value of text input fields
  QGetTextFromField = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        [e.target.name]: e.target.value
      }
    });
  }

  // Updates state with the checked state of the "remember me" checkbox
  QToggleCheckbox = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        remember_me: e.target.checked
      }
    });
  }

  // Handles login logic and sends credentials to the server
  QPostLogin = () => {
    const { username, password, remember_me } = this.state.user_input;

    // Validate that username and password are not empty
    if (username === "" || password === "") {
      this.setState({ status: { success: false, msg: "Missing input field" } });
      return;
    }

    axios.post(`${API_URL}/users/login`, { username, password })
      .then(response => {
        if (response.status === 200) {
          // Update state with server response
          this.setState({ status: response.data.status, user: response.data.user });

          if (remember_me) {
            // Store user data in local storage if "remember me" is checked
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('remember_me', JSON.stringify(remember_me));
          } else {
            // Clear user data from local storage if "remember me" is not checked
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('remember_me');
          }
        } else {
          this.setState({ status: { success: false, msg: "Something went wrong, please try again." } });
        }
      })
      .catch(err => {
        this.setState({ status: { success: false, msg: "An error occurred. Please try again." } });
        console.error(err);
      });
  }

  render() {
    const { user_input, status } = this.state;

    return (
      <div className="card" style={{ width: "400px", margin: "10px auto" }}>
        <form style={{ margin: "20px" }}>
          {/* Input for the username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              onChange={this.QGetTextFromField}
              type="text"
              className="form-control"
              value={user_input.username}
              id="exampleInputEmail1"
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
              id="exampleInputPassword1"
            />
          </div>
          {/* Checkbox for "Remember me" */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              name="remember_me"
              onChange={this.QToggleCheckbox}
              checked={user_input.remember_me}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#003f5c",
                border: "1px solid #003f5c",
                borderRadius: "3px",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                outline: "none",
                cursor: "pointer"
              }}
            />
            <label className="form-check-label" htmlFor="rememberMe" style={{ marginLeft: "8px", cursor: "pointer" }}>
              Remember me
            </label>
          </div>
        </form>
        {/* Button to trigger login */}
        <button
          style={{ margin: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}
          onClick={this.QPostLogin}
          className="btn btn-primary"
        >
          Log In
        </button>

        {/* Display success or error messages */}
        {status.success === true &&
          <p className="alert alert-success" role="alert">
            {status.msg}
          </p>
        }

        {status.success === false &&
          status.msg !== "" &&
          <p className="alert alert-danger" role="alert">
            {status.msg}
          </p>
        }
      </div>
    )
  }
}

export default LoginView;