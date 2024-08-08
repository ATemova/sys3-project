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
    this.state = {
      CurrentPage: LOGIN, // Default page
      Novica: 1, // Example state, usage depends on your implementation
      status: {
        success: null,
        msg: ""
      },
      user: null // Track user login state
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession = async () => {
    try {
      const response = await axios.get(`${API_URL}/session`, { withCredentials: true });
      if (response.data.logged_in) {
        this.setState({ user: response.data.user });
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  // Handle user logout
  handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      if (response.data.status.success) {
        this.setState({ user: null });
        this.QSetView({ page: HOME });
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Update user login status from child component
  QSetLoggedIn = (user) => {
    this.setState({ user });
    this.QSetView({ page: HOME });
  };

  // Determines which component to render based on the current page state
  QGetView(state) {
    const page = state.CurrentPage;
    switch (page) {
      case CATEGORY:
        return <Category />;
      case COMMENTS:
        return <Comments />;
      case BOOKS:
        return <Books />;
      case SIGNUP:
        return <SignupView QUserFromChild={this.QSetLoggedIn} />;
      case LOGIN:
        return <LoginView QUserFromChild={this.QSetLoggedIn} />;
      case LOGOUT:
        return <Home />;
      default:
        return <Home />;
    }
  }

  // Updates the current page and optionally other states
  QSetView = (obj) => {
    this.setState({
      status: { success: null, msg: "" }, // Reset status
      CurrentPage: obj.page,
      Rating: obj.id || 0 // Set Rating if provided
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
          {this.QGetView(this.state)} {/* Render the appropriate component based on current page */}
        </div>
      </div>
    );
  }
}

export default App;