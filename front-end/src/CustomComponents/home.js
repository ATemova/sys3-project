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
    fetch(`${API_URL}/user`) // Use the API_URL to construct the API endpoint
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Check if the data contains the user's name
        if (data && data.name) {
          // Update the state with the user's name
          this.setState({ userName: data.name });
        }
      })
      .catch((error) => console.error("Error fetching user data:", error)); // Handle any errors that occur during the fetch operation
  }

  render() {
    return (
      <div className="card" style={{ margin: "10px" }}>
        <div className="card-body">
          {/* Display a welcome message with the user's name */}
          <h5 className="card-title">Welcome, {this.state.userName}!</h5>
          {/* Display a static message */}
          <p className="card-text">Welcome to BookFlow, your digital gateway to a universe of knowledge and imagination! 
            Whether you are a professor or a student on the hunt for academic resources, our online library has something for everyone. 
            With BookFlow, you gain access to an extensive collection of e-books covering a wide range of subjects.
            Explore curated collections, stay updated with new arrivals, and benefit from our expertly recommended picks. 
            Joining is simple and free—sign up today and start your journey through an ever-expanding world of literature and learning.</p>

          <p>Immerse yourself in our meticulously curated collections, each thoughtfully assembled to offer both breadth and depth in various 
            fields. Our dynamic platform ensures you stay updated with the newest arrivals, making it easy to find the latest releases and hot 
            topics. Benefit from our expertly recommended picks, tailored to your interests and academic pursuits, helping you discover 
            hidden gems and must-reads.</p>

          <p>Joining BookFlow is simple and free—create your account today and unlock a world of knowledge at your fingertips. 
            Whether you are conducting research, preparing for lectures, or simply seeking to broaden your horizons, BookFlow is here to 
            support your intellectual journey. Start exploring our vast digital library and experience the joy of reading and learning like 
            never before. Happy reading and discovering!</p>
        </div>
      </div>
    );
  }
}

export default Home;