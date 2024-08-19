import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class SignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_input: {
        username: "",
        email: "",
        password: "",
        name: "",
        surname: ""
      },
      status: {
        success: null,
        msg: ""
      }
    };
  }

  // Update state when input fields are changed
  QGetTextFromField = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        [e.target.name]: e.target.value
      }
    });
  };

  // Handle form submission and signup
  QPostSignup = async () => {
    const { username, email, password, name, surname } = this.state.user_input;

    // Validate that all fields are filled
    if (!username || !email || !password || !name || !surname) {
      this.setState({
        status: {
          success: false,
          msg: "Please fill in all fields."
        }
      });
      return;
    }

    try {
      // Make POST request to the server
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
        name,
        surname
      });

      if (response.status === 200 && response.data.success) {
        this.setState({
          status: {
            success: true,
            msg: "User registered successfully."
          },
          user_input: {
            username: "",
            email: "",
            password: "",
            name: "",
            surname: ""
          }
        });

        // Optionally store user data for auto-login or further processing
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('remember_me', JSON.stringify(true));

        // Call parent component method if provided
        if (this.props.QUserFromChild) {
          this.props.QUserFromChild(response.data.user);
        }

        // Redirect to login or dashboard after successful signup
        setTimeout(() => {
          this.props.history.push("/login");
        }, 2000); // 2-second delay before redirect
      } else {
        // Display error message from server response
        this.setState({
          status: {
            success: false,
            msg: response.data.message || "Failed to register user."
          }
        });
      }
    } catch (err) {
      console.error("Error during registration:", err);
      this.setState({
        status: {
          success: false,
          msg: "An error occurred. Please try again later."
        }
      });
    }
  };

  render() {
    const { user_input, status } = this.state;

    return (
      <div className="card" style={{ width: "400px", margin: "10px auto", padding: "20px" }}>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              onChange={this.QGetTextFromField}
              value={user_input.name}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Surname</label>
            <input
              name="surname"
              onChange={this.QGetTextFromField}
              value={user_input.surname}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              onChange={this.QGetTextFromField}
              value={user_input.username}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              name="email"
              onChange={this.QGetTextFromField}
              value={user_input.email}
              type="email"
              className="form-control"
              required
            />
            <div className="form-text">
              Your email will never be shared with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              onChange={this.QGetTextFromField}
              value={user_input.password}
              type="password"
              className="form-control"
              required
            />
          </div>
        </form>
        <button
          style={{ marginTop: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}
          onClick={this.QPostSignup}
          className="btn btn-primary"
        >
          Sign Up
        </button>

        {status.success !== null && (
          <div className={`alert ${status.success ? 'alert-success' : 'alert-danger'}`} role="alert" style={{ marginTop: "10px" }}>
            {status.msg}
          </div>
        )}
      </div>
    );
  }
}

export default SignupView;