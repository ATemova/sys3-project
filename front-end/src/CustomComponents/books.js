import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      selectedFile: null,
      title: "" 
    };
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  saveComment = () => {
    const { comment, title } = this.state;
    axios.post(`${API_URL}/saveComment`, { comment, title })
      .then(res => {
        console.log("Comment saved:", res.data);
      })
      .catch(err => {
        console.error("Error saving comment:", err);
      });
  };

  uploadFile = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);

    axios.post(`${API_URL}/uploadFile`, data)
      .then(res => {
        console.log("File uploaded:", res.data);
      })
      .catch(err => {
        console.error("Error uploading file:", err);
      });
  };

  render() {
    return (
      <div className="card" style={{ margin: "10px" }}>
        <h3 style={{ margin: "10px" }}>Write comment for a book</h3>
        <div className="mb-3" style={{ margin: "10px" }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Name of the book</label>
            <input
              name="title"
              type="text"
              onChange={this.handleTitleChange}
              className="form-control"
              placeholder="Name of the book"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Write a comment</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              value={this.state.comment}
              onChange={this.handleCommentChange}
              placeholder="Write a comment"
            ></textarea>
            <button className="btn btn-primary" onClick={this.saveComment} style={{ marginTop: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}>Save Comment</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Books;