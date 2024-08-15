import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class SignupView extends React.Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      user_input: {
        username: "", // Stores the username input
        email: "",    // Stores the email input
        password: ""  // Stores the password input
      },
      status: {
        success: false, // Indicates if the registration was successful
        msg: ""         // Stores status message
      }
    }
  }

  // Updates state with the value of text input fields
  QGetTextFromField = (e) => {
    this.setState({
      user_input: {
        ...this.state.user_input,
        [e.target.name]: e.target.value // Update the corresponding field in user_input state
      }
    });
  }

  // Handles the user registration logic
  QPostSignup = () => {
    const { username, email, password } = this.state.user_input;

    // Validate that all fields are filled
    if (!username || !email || !password) {
      this.setState({
        status: {
          success: false,
          msg: "Please fill in all fields." // Display error message if any field is empty
        }
      });
      return;
    }

    // Send registration data to the server
    axios.post(`${API_URL}/users/register`, {
      username,
      email,
      password
    })
      .then(response => {
        if (response.status === 200) {
          // Update state with success status and clear input fields
          this.setState({
            status: {
              success: true,
              msg: "User registered successfully." // Display success message upon successful registration
            },
            user_input: {
              username: "",
              email: "",
              password: ""
            }
          });

          // Store user data in local storage for auto-login
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('remember_me', JSON.stringify(true)); // Store "remember me" as true
        } else {
          // Handle failed registration
          this.setState({
            status: {
              success: false,
              msg: "Failed to register user." // Display error message if registration fails
            }
          });
        }
      })
      .catch(err => {
        console.error(err);
        // Handle errors during registration
        this.setState({
          status: {
            success: false,
            msg: "An error occurred. Please try again later." // Display error message for unexpected errors
          }
        });
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
              onChange={this.QGetTextFromField} // Update state on input change
              value={user_input.username}
              type="text"
              className="form-control"
              id="exampleInputUsername"
              aria-describedby="usernameHelp"
            />
          </div>
          {/* Input for the email address */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              name="email"
              onChange={this.QGetTextFromField} // Update state on input change
              value={user_input.email}
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              Your email will never be shared with anyone else.
            </div>
          </div>
          {/* Input for the password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              onChange={this.QGetTextFromField} // Update state on input change
              value={user_input.password}
              type="password"
              className="form-control"
              id="exampleInputPassword"
            />
          </div>
        </form>
        {/* Button to submit the signup form */}
        <button
          style={{ margin: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}
          onClick={this.QPostSignup} // Trigger signup process on click
          className="btn btn-primary"
        >
          Submit
        </button>

        {/* Display success or error messages */}
        {status.success &&
          <p className="alert alert-success" role="alert">
            {status.msg} {/* Display success message */}
          </p>
        }

        {!status.success && status.msg !== "" &&
          <p className="alert alert-danger" role="alert">
            {status.msg} {/* Display error message */}
          </p>
        }
      </div>
    );
  }
}

export default SignupView;