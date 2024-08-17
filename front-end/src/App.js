import React, { Component } from "react";
import Home from "./CustomComponents/home";
import Category from "./CustomComponents/category";
import Books from "./CustomComponents/Books";
import Comments from "./CustomComponents/Comments";
import SignupView from "./CustomComponents/SignupView";
import LoginView from "./CustomComponents/LoginView";
import axios from "axios";
import { API_URL } from "./Utils/Configuration";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: 'LOGIN', // Default page
      user: null // Track user login state
    };
  }

  componentDidMount() {
    this.checkSession(); // Check session on mount
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

  handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      if (response.data.status && response.data.status.success) {
        this.setState({ user: null }, () => {
          this.QSetView({ page: 'HOME' });
          window.location.reload(); // Ensures session data is fully cleared
        });
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  QSetLoggedIn = (user) => {
    this.setState({ user }, () => {
      this.QSetView({ page: 'HOME' });
    });
  };

  QSetView = (obj) => {
    this.setState({
      CurrentPage: obj.page
    });
  };

  QGetView(state) {
    const page = state.CurrentPage;
    switch (page) {
      case 'CATEGORY':
        return <Category />;
      case 'COMMENTS':
        return <Comments />;
      case 'BOOKS':
        return <Books />;
      case 'SIGNUP':
        return <SignupView QUserFromChild={this.QSetLoggedIn} />;
      case 'LOGIN':
        return <LoginView QUserFromChild={this.QSetLoggedIn} />;
      default:
        return <Home />;
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div
        id="APP"
        className="container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/libraryBooks2.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003f5c' }}>
          <div className="container-fluid">
            <a onClick={() => this.QSetView({ page: 'HOME' })} className="navbar-brand" href="#">
              Home
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {user ? (
                  <>
                    <li className="nav-item">
                      <a onClick={() => this.QSetView({ page: 'CATEGORY' })} className="nav-link" href="#">
                        Category
                      </a>
                    </li>
                    <li className="nav-item">
                      <a onClick={() => this.QSetView({ page: 'BOOKS' })} className="nav-link" href="#">
                        Books
                      </a>
                    </li>
                    <li className="nav-item">
                      <a onClick={() => this.QSetView({ page: 'COMMENTS' })} className="nav-link" href="#">
                        Comments
                      </a>
                    </li>
                    <li className="nav-item">
                      <a onClick={this.handleLogout} className="nav-link" href="#">
                        Log out
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a onClick={() => this.QSetView({ page: 'SIGNUP' })} className="nav-link" href="#">
                        Sign up
                      </a>
                    </li>
                    <li className="nav-item">
                      <a onClick={() => this.QSetView({ page: 'LOGIN' })} className="nav-link" href="#">
                        Log in
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div id="viewer" className="row container">
          {this.QGetView(this.state)}
        </div>
      </div>
    );
  }
}

export default App;