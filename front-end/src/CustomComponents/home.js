import React from "react";
import { API_URL } from "../Utils/Configuration";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      userName: "", // Stores the user's name fetched from the API
    };
  }

  // This method runs after the component is first added to the DOM
  componentDidMount() {
    // Fetch user data from the API
    fetch(`${API_URL}/user`)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (data && data.name) {
          // Update the state with the user's name
          this.setState({ userName: data.name });
        }
      })
      .catch((error) => console.error("Error fetching user data:", error)); // Handle any errors
  }

  render() {
    return (
      <div className="card" style={{ margin: "10px" }}>
        <div className="card-body">
          {/* Display a welcome message with the user's name */}
          <h5 className="card-title">Welcome, {this.state.userName}!</h5>
          <p className="card-text">You are in the online University library</p>
        </div>
      </div>
    );
  }
}

export default Home;