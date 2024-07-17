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
      CurrentPage: LOGIN,
      Novica: 1,
      status: {
        success: null,
        msg: ""
      },
      user: null
    };
  }

  QGetView(state) {
    const page = state.CurrentPage;
    switch (page) {
      default:
        return <Home />;
      case CATEGORY:
        return <Category />;
      case COMMENTS:
        return <Comments />;
      case BOOKS:
        return <Books />;
      case SIGNUP:
        return <SignupView />;
      case LOGIN:
        return <LoginView QUserFromChild={this.QSetLoggedIn} />;
      case LOGOUT:
        return <Home />;
    }
  }

  QSetView = (obj) => {
    this.setState(this.state.status = { success: null, msg: "" });

    console.log("QSetView");
    this.setState({
      CurrentPage: obj.page,
      Rating: obj.id || 0
    });
  };

  render() {
    return (
      <div id="APP" className="container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/libraryBooks2.jpg)`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003f5c' }}>
            <div className="container-fluid">
              <a
                onClick={this.QSetView.bind(this, { page: "home" })}
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
                      onClick={this.QSetView.bind(this, { page: CATEGORY })}
                      className="nav-link"
                      href="#"
                    >
                      Category
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={this.QSetView.bind(this, { page: BOOKS })}
                      className="nav-link"
                      href="#"
                    >
                      Books
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={this.QSetView.bind(this, { page: COMMENTS })}
                      className="nav-link"
                      href="#"
                    >
                      Comments
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={this.QSetView.bind(this, { page: SIGNUP })}
                      className="nav-link"
                      href="#"
                    >
                      Sign up
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={this.QSetView.bind(this, { page: LOGIN })}
                      className="nav-link"
                      href="#"
                    >
                      Log in
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div id="viewer" className="row container">
          {this.QGetView(this.state)}
        </div>
      </div>
    );
  }
}

export default App;