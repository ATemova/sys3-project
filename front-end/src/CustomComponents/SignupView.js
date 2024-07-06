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
        password: ""
      },
      status: {
        success: false,
        msg: ""
      }
    }
  }

  QGetTextFromField = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        [e.target.name]: e.target.value
      }
    });
  }

  QPostSignup = () => {
    const { username, email, password } = this.state.user_input;
    if (!username || !email || !password) {
      this.setState({
        status: {
          success: false,
          msg: "Please fill in all fields."
        }
      });
      return;
    }

    axios.post(`${API_URL}/users/register`, {
      username,
      email,
      password
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            status: {
              success: true,
              msg: "User registered successfully."
            },
            user_input: {
              username: "",
              email: "",
              password: ""
            }
          });

          // Store user data in local storage to enable auto-login
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('remember_me', JSON.stringify(true));
        } else {
          this.setState({
            status: {
              success: false,
              msg: "Failed to register user."
            }
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          status: {
            success: false,
            msg: "An error occurred. Please try again later."
          }
        });
      });
  }

  render() {
    const { status } = this.state;

    return (
      <div className="card"
        style={{ width: "400px", margin: "10px auto" }}>
        <form style={{ margin: "20px" }} >
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input name="username" onChange={this.QGetTextFromField}
              value={this.state.user_input.username}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input name="email" onChange={this.QGetTextFromField}
              value={this.state.user_input.email}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp" />
            <div id="emailHelp"
              className="form-text">Your email will never be shared with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" onChange={this.QGetTextFromField}
              value={this.state.user_input.password}
              type="password"
              className="form-control"
              id="exampleInputPassword1" />
          </div>
        </form>
        <button style={{ margin: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }} onClick={this.QPostSignup}
          className="btn btn-primary bt" >Submit</button>

        {status.success ?
          <p className="alert alert-success"
            role="alert">{status.msg}</p> : null}

        {!status.success && status.msg !== "" ?
          <p className="alert alert-danger"
            role="alert">{status.msg}</p> : null}

      </div>
    )
  }
}

export default SignupView;