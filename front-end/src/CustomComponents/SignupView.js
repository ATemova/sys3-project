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

  QGetTextFromField = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        [e.target.name]: e.target.value
      }
    });
  }

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
      const response = await axios.post(`${API_URL}/users/register`, {
        username,
        email,
        password,
        name,
        surname
      });

      if (response.status === 200) {
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

        // Optionally store user data for auto-login
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('remember_me', JSON.stringify(true)); // Store "remember me" as true

        // Call parent component method if provided
        if (this.props.QUserFromChild) {
          this.props.QUserFromChild(response.data.user);
        }
      } else {
        this.setState({
          status: {
            success: false,
            msg: "Failed to register user."
          }
        });
      }
    } catch (err) {
      console.error(err);
      this.setState({
        status: {
          success: false,
          msg: "An error occurred. Please try again later."
        }
      });
    }
  }

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
            />
          </div>
        </form>
        <button
          style={{ marginTop: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}
          onClick={this.QPostSignup}
          className="btn btn-primary"
        >
          Submit
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

export default SignupView;
