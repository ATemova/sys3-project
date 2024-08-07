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
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state);
  };

  // Handles file upload and updates state with the selected file
  QFileUpload = (e) => {
    this.setState({
      novica: {
        ...this.state.novica,
        file: e.target.files[0],
      },
    });
    console.log(this.state);
  };

  // Sends comment data to the server
  QPostNovica = () => {
    // Validate that title and text fields are not empty
    if (this.state.novica.title === "" || this.state.novica.text === "") {
      this.setState({
        status: { success: false, msg: "Missing input field" },
      });
      return;
    }
    console.log("QPostNovica");

    // Create FormData object to send file and text data
    const data = new FormData();
    data.append("file", this.state.novica.file);
    data.append("title", this.state.novica.title);
    data.append("text", this.state.novica.text);

    // Create an axios instance with a timeout and credentials
    let req = axios.create({
      timeout: 20000, // 20 seconds timeout
      withCredentials: true, // Send cookies with the request
    });

    // Send POST request to the server
    req
      .post(API_URL + "/novice", data)
      .then((response) => {
        this.setState({ status: response.data });
        console.log("Sent to server...");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { success, msg } = this.state.status;
    return (
      <div className="card" style={{ margin: "10px", minHeight: "50vh", padding: "20px" }}>
        <h3 style={{ margin: "10px" }}>Welcome user</h3>
        
        {/* Input for the title of the comment */}
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Title of the comment</label>
          <input
            name="title"
            type="text"
            onChange={this.QGetTextFromField}
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
            onChange={this.QGetTextFromField}
            rows="5" 
            placeholder="Write comment here"
          ></textarea>
        </div>

        {/* Button to send the comment */}
        <button
          className="btn btn-primary"
          onClick={this.QPostNovica}
          style={{
            marginTop: "10px",
            backgroundColor: "#003f5c",
            borderColor: "#003f5c",
          }}
        >
          Send
        </button>

        {/* Display success or error messages */}
        {success !== null && (
          <p className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
            {msg}
          </p>
        )}
      </div>
    );
  }
}

export default Comments;