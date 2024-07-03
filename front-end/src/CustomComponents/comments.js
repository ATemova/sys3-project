import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      novica: {
        title: "",
        text: "",
        file: null
      },
      status: {
        success: null,
        msg: ""
      }
    }
  }

  QGetTextFromField = (e) => {
    this.setState(this.state.novica[e.target.name] = [e.target.value])
    console.log(this.state)
  }

  QFileUplad = (e) => {
    this.setState(this.state.novica["file"] = e.target.files[0])
    console.log(this.state)
  }
  QPostNovica = () => {
    if (this.state.novica.title == "" |
      this.state.novica.text == ""
    ) {
      this.setState(this.state.status = { success: false, msg: "Missing input filed" })
      return
    }
    console.log("QPostNovica");

    const data = new FormData() ;
    data.append('file', this.state.novica.file)
    data.append('title',this.state.novica.title)
    data.append('text',this.state.novica.text)

    let req = axios.create({
      timeout: 20000,
      withCredentials: true
    });

    req.post(API_URL + '/novice', data).then(response => {
        this.setState(this.state.status = response.data)
        console.log("Sent to server...")
      })
      .catch(err => {
        console.log(err)
      })
    }

  render() {
    const { success, msg } = this.state.status;
    return (
      <div className="card"
        style={{ margin: "10px" }}>
        <h3 style={{ margin: "10px" }}>Welcome user</h3>
        <div className="mb-3"
          style={{ margin: "10px" }}>
          <label className="form-label">Title</label>
          <input name="title" type="text"
            onChange={this.QGetTextFromField.bind(this)}
            className="form-control"
            placeholder="Title..." />
        </div>
        <div className="mb-3"
          style={{ margin: "10px" }}>
          <label className="form-label">
            Text
          </label>
          <textarea name="text" className="form-control" onChange={(e) => this.QGetTextFromField(e)}
            rows="3">
          </textarea>
        </div>
        <div className="mb-3">
          <label for="formFile" class="form-label">Default file input</label>
          <input class="form-control" type="file" id="file" name="file" onChange={(e) => {this.QFileUplad(e)}} />
        </div>

        <button className="btn btn-primary bt" onClick={() => this.QPostNovica()}
          style={{ margin: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}>
          Send
        </button>

        {
          success && (<p className="alert alert-success" role="alert">
              {msg}
            </p>
          )}
          {success === false && msg !== "" && (<p className="alert alert-danger" role="alert">
              {msg}
            </p>
          )}
      
        {this.state.status.success ?
          <p className="alert alert-success"
            role="alert">{this.state.status.msg}</p> : null}

        {!this.state.status.success &&
          this.state.status.msg != "" ?
          <p className="alert alert-danger"
            role="alert">{this.state.status.msg}</p> : null}
      </div>
    )
  }
}

export default Comments