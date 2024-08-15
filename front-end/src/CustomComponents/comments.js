import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      novica: {
        title: "", // Stores the title of the comment
        text: "", // Stores the text of the comment
        file: null, // Stores the uploaded file
      },
      status: {
        success: null, // Indicates if the operation was successful
        msg: "", // Stores the status message
      },
    };
  }

  // Updates state with the value of text input fields
  QGetTextFromField = (e) => {
    this.setState({
      novica: {
        ...this.state.novica,
        [e.target.name]: e.target.value, // Dynamically update the specific field based on input name
      },
    });
    console.log(this.state); // Log the updated state for debugging purposes
  };

  // Handles file upload and updates state with the selected file
  QFileUpload = (e) => {
    this.setState({
      novica: {
        ...this.state.novica,
        file: e.target.files[0], // Set the selected file in the state
      },
    });
    console.log(this.state); // Log the updated state for debugging purposes
  };

  // Sends comment data to the server
  QPostNovica = () => {
    // Validate that title and text fields are not empty
    if (this.state.novica.title === "" || this.state.novica.text === "") {
      this.setState({
        status: { success: false, msg: "Missing input field" }, // Set error message if validation fails
      });
      return; // Exit the function if validation fails
    }
    console.log("QPostNovica"); // Log the action for debugging purposes

    // Create FormData object to send file and text data
    const data = new FormData();
    data.append("file", this.state.novica.file); // Append the file to FormData
    data.append("title", this.state.novica.title); // Append the title to FormData
    data.append("text", this.state.novica.text); // Append the text to FormData

    // Create an axios instance with a timeout and credentials
    let req = axios.create({
      timeout: 20000, // 20 seconds timeout
      withCredentials: true, // Send cookies with the request
    });

    // Send POST request to the server
    req
      .post(API_URL + "/novice", data)
      .then((response) => {
        this.setState({ status: response.data }); // Update state with the server response
        console.log("Sent to server..."); // Log the action for debugging purposes
      })
      .catch((err) => {
        console.log(err); // Log errors for debugging purposes
      });
  };

  render() {
    const { success, msg } = this.state.status; // Destructure status from state
    return (
      <div className="card" style={{ margin: "10px", minHeight: "50vh", padding: "20px" }}>
        <h3 style={{ margin: "10px" }}>Welcome user</h3>
        
        {/* Input for the title of the comment */}
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Title of the comment</label>
          <input
            name="title"
            type="text"
            onChange={this.QGetTextFromField} // Update state on input change
            className="form-control"
            placeholder="Title of the comment"
          />
        </div>

        {/* Textarea for the comment text */}
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Write comment here</label>
          <textarea
            name="text"
            className="form-control"
            onChange={this.QGetTextFromField} // Update state on input change
            rows="5" 
            placeholder="Write comment here"
          ></textarea>
        </div>

        {/* Button to send the comment */}
        <button
          className="btn btn-primary"
          onClick={this.QPostNovica} // Trigger comment posting on click
          style={{
            marginTop: "10px",
            backgroundColor: "#003f5c", // Custom button color
            borderColor: "#003f5c", // Custom button border color
          }}
        >
          Send
        </button>

        {/* Display success or error messages */}
        {success !== null && (
          <p className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
            {msg} {/* Display the status message */}
          </p>
        )}
      </div>
    );
  }
}

export default Comments;