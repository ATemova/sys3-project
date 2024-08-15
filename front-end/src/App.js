import React, { Component } from "react";
import { HOME, CATEGORY, BOOKS, COMMENTS, SIGNUP, LOGIN, LOGOUT } from "./Utils/Constants";
import Home from "./CustomComponents/home";
import Category from "./CustomComponents/category";
import Books from "./CustomComponents/books";
import Comments from "./CustomComponents/comments";
import SignupView from "./CustomComponents/SignupView";
import LoginView from "./CustomComponents/LoginView";
import axios from "axios";
import { API_URL } from "./Utils/Configuration";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      CurrentPage: LOGIN, // Default page when the app loads
      Novica: 1, // Example state, purpose depends on your implementation
      status: {
        success: null,
        msg: "" // Stores status messages
      },
      user: null // Track user login state
    };
  }

  componentDidMount() {
    this.checkSession(); // Check session on component mount
  }

  // Check if a user session exists
  checkSession = async () => {
    try {
      const response = await axios.get(`${API_URL}/session`, { withCredentials: true });
      if (response.data.logged_in) {
        this.setState({ user: response.data.user }); // Set user state if logged in
      }
    } catch (error) {
      console.error("Error checking session:", error); // Handle any errors
    }
  };

  // Handle user logout
  handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      if (response.data.status.success) {
        this.setState({ user: null }); // Clear user state on successful logout
        this.QSetView({ page: HOME }); // Redirect to home page
      }
    } catch (error) {
      console.error("Error logging out:", error); // Handle any errors
    }
  };

  // Update user login status from child component
  QSetLoggedIn = (user) => {
    this.setState({ user }); // Set user state when logged in
    this.QSetView({ page: HOME }); // Redirect to home page
  };

  // Determines which component to render based on the current page state
  QGetView(state) {
    const page = state.CurrentPage;
    switch (page) {
      case CATEGORY:
        return <Category />; // Render Category component
      case COMMENTS:
        return <Comments />; // Render Comments component
      case BOOKS:
        return <Books />; // Render Books component
      case SIGNUP:
        return <SignupView QUserFromChild={this.QSetLoggedIn} />; // Pass callback to SignupView
      case LOGIN:
        return <LoginView QUserFromChild={this.QSetLoggedIn} />; // Pass callback to LoginView
      case LOGOUT:
        return <Home />; // Render Home component
      default:
        return <Home />; // Default to Home component if no valid page is found
    }
  }

  // Updates the current page and optionally other states
  QSetView = (obj) => {
    this.setState({
      status: { success: null, msg: "" }, // Reset status messages
      CurrentPage: obj.page, // Update current page
      Rating: obj.id || 0 // Set Rating if provided in the obj
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div id="APP" className="container"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/libraryBooks2.jpg)`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003f5c' }}>
            <div className="container-fluid">
              <a
                onClick={() => this.QSetView({ page: HOME })}
                className="navbar-brand"
                href="#"
              >
                Home
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: CATEGORY })}
                      className="nav-link"
                      href="#"
                    >
                      Category
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: BOOKS })}
                      className="nav-link"
                      href="#"
                    >
                      Books
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: COMMENTS })}
                      className="nav-link"
                      href="#"
                    >
                      Comments
                    </a>
                  </li>

                  {!user && (
                    <>
                      <li className="nav-item">
                        <a
                          onClick={() => this.QSetView({ page: SIGNUP })}
                          className="nav-link"
                          href="#"
                        >
                          Sign up
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          onClick={() => this.QSetView({ page: LOGIN })}
                          className="nav-link"
                          href="#"
                        >
                          Log in
                        </a>
                      </li>
                    </>
                  )}

                  {user && (
                    <li className="nav-item">
                      <a
                        onClick={this.handleLogout}
                        className="nav-link"
                        href="#"
                      >
                        Log out
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div id="viewer" className="row container">
          {this.QGetView(this.state)} {/* Render the appropriate component based on the current page */}
        </div>
      </div>
    );
  }
}

export default App;