import React, { Component } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { API_URL } from "../Utils/Configuration";

class Books extends Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      comment: "", // Stores the user's comment
      title: "", // Stores the selected book title
      rating: 0, // Stores the user's rating
      // Array of colors for stars based on rating
      starColors: ["#ff4545", "#ffa534", "#ffe234", "#b7dd29", "#57e32c"],
      // List of book titles to select from
      books: [
        "Mathematics I - Analysis I", "Mathematics II - Algebra I", "Theoretical Computer Science I – Discrete Structures", 
        "Theoretical Computer Science II – Formal Languages and Computability", "Programming I", 
        "Programming II – Concepts of Programming Languages", "Systems I – Hardware", 
        "Systems II – Operating Systems and Computer Networks", "Computer Practicum I", "Computer Practicum II", 
        "Mathematics III – Algebra II", "Mathematics IV – Combinatorics with Graph Theory", 
        "Data Structures and Algorithms", "Programming III – Concurrent Programming", 
        "Systems III – Information Systems", "Introduction to Database Systems", "Computer Networks", 
        "Theoretical Computer Science III – Information Theory", "Software Engineering", 
        "Information Technology Management", "Augmented Reality", "Language Technologies", 
        "Multimedia Design", "Geographic Information Systems", "Human–Computer Interaction", 
        "Introduction to Machine Learning and Data Mining", "Decision Support Systems", "Adaptive Interactive Systems"
      ]
    };
  }

  // Handles changes in the comment input field
  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  // Handles changes in the book title selection
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  // Updates the rating and toggles between a selected rating and no rating
  changeRating = (newRating) => {
    this.setState((prevState) => ({
      rating: prevState.rating === newRating ? 0 : newRating
    }));
  };

  // Sends the comment, title, and rating to the server
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
    const { rating, starColors, books } = this.state;

    return (
      <div className="card" style={{ margin: "10px" }}>
        <h3 style={{ margin: "10px" }}>Write comment for a book</h3>
        <div className="mb-3" style={{ margin: "10px" }}>
          {/* Book title selection */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Name of the book</label>
            <select
              name="title"
              onChange={this.handleTitleChange}
              className="form-control"
              value={this.state.title}
            >
              {books.map((book, index) => (
                <option key={index} value={book}>{book}</option>
              ))}
            </select>
          </div>
          
          {/* Comment input field */}
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
          
          {/* Rating component */}
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
          
          {/* Save button */}
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