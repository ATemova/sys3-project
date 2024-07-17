import React, { Component } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { API_URL } from "../Utils/Configuration";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      title: "",
      rating: 0,
      starColors: ["#ff4545", "#ffa534", "#ffe234", "#b7dd29", "#57e32c"]
    };
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  changeRating = (newRating) => {
    this.setState((prevState) => ({
      rating: prevState.rating === newRating ? 0 : newRating
    }));
  };

  saveComment = () => {
    const { comment, title, rating } = this.state;
    axios.post(`${API_URL}/saveComment`, { comment, title, rating })
      .then(res => {
        console.log("Comment saved:", res.data);
      })
      .catch(err => {
        console.error("Error saving comment:", err);
      });
  };

  render() {
    const { rating, starColors } = this.state;

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
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rate the book</label>
            <div style={{ fontSize: 24 }}>
              <StarRatings
                rating={rating}
                starRatedColor={rating ? starColors[rating - 1] : starColors[0]}
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                starDimension="40px"
                starSpacing="15px"
                starHoverColor={starColors[0]}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={this.saveComment}
            style={{ marginTop: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}
          >
            Save comment and rating
          </button>
        </div>
      </div>
    );
  }
}

export default Books;