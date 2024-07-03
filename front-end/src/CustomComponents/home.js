import React from "react";
import { API_URL } from "../Utils/Configuration";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  // This method runs after the component is first added to the DOM
  componentDidMount() {
    // Fetch user data from the API
    fetch(`${API_URL}/user`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.name) {
          this.setState({ userName: data.name });
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }

  render() {
    return (
      <div className="card" style={{ margin: "10px" }}>
        <div className="card-body">
          <h5 className="card-title">Welcome, {this.state.userName}!</h5>
          <p className="card-text">You are in the online University library</p>
        </div>
      </div>
    );
  }
}

export default Home;