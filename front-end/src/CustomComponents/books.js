import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class Books extends Component {
  //method for the file upload
  uploadFile = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    axios.post(`${API_URL}/uploadFile`, data)
      .then(res => {
        //then for printing the response status
        console.log(res.data);
      })
      .catch(err => {
        console.error("Error uploading file:", err);
      });
  };

  render() {
    return (
      <div className="card" style={{ margin: "10px" }}>
        <h3 style={{ margin: "10px" }}>File upload</h3>
        <div className="mb-3" style={{ margin: "10px" }}>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Default file input example</label>
            <input className="form-control" type="file" id="file" onChange={this.uploadFile} />
          </div>
        </div>
      </div>
    );
  }
}

export default Books;