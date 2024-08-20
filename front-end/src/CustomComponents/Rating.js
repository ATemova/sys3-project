import React, { Component } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { API_URL } from "../Utils/Configuration";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "", // Stores the user's comment
      title: "", // Stores the selected book title
      rating: 0, // Stores the user's rating
      starColors: ["#ff4545", "#ffa534", "#ffe234", "#b7dd29", "#57e32c"], // Colors for the stars based on rating
      // books: [
      //   "Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus", "Algebra I – Matrix Calculus", "Algebra II – Linear Algebra", "Computer Practicum", 
      //   "Programming I", "Theoretical Computer Science I", "Data Programming", "Organic Chemistry and Biochemistry", "Genetics", "Data Structures and Algorithms", "Introduction to Bioinformatics", 
      //   "Foundations of Physics with Biophysics", "Analysis III – Functions of Many Variables", "Statistics", "Algorithms in Bioinformatics", "Programming II – Concepts of Programming Languages", 
      //   "Nucleotide Sequence Analysis", "Structure of Biological Molecules","Biotechnology", "Evolutionary and Population Genetics", "Systems III – Information Systems", "Evolutionary Biology", 
      //   "Physical Chemistry with Cheminformatics", "Functional Genomics", "Mathematical Modelling in Bioinformatics", "Mathematics I - Analysis I", "Mathematics II - Algebra I", 
      //   "Theoretical Computer Science I – Discrete Structures", "Theoretical Computer Science II – Formal Languages and Computability", "Systems I – Hardware", 
      //   "Systems II – Operating Systems and Computer Networks", "Computer Practicum I", "Computer Practicum II", "Mathematics III – Algebra II", "Mathematics IV – Combinatorics with Graph Theory", 
      //   "Programming III – Concurrent Programming", "Introduction to Database Systems", "Computer Networks", "Theoretical Computer Science III – Information Theory", "Software Engineering", 
      //   "Information Technology Management", "Augmented Reality", "Language Technologies", "Multimedia Design", "Geographic Information Systems", "Human–Computer Interaction", 
      //   "Introduction to Machine Learning and Data Mining", "Decision Support Systems", "Adaptive Interactive Systems", "Foundations of Psychology", "Differential Psychology", "Basics of Biopsychology", 
      //   "Psychology of Rational Thinking and Logic", "Developmental Psychology I", "Neurological Bases of Higher Nervous Functions I","Evolutionary Psychology", "Statistics for Psychologists", 
      //   "Research Methodology in   Psychology", "Cognitive Psychology", "Biochemistry and Genetics in Biopsychology", "Social Psychology I", "Psychological Diagnostics", 
      //   "Biopsychology of Motivation and Emotions","Developmental Psychology II", "Psychometrics", "Mental Health, Mental Disorders", "Neurological Bases of Higher Nervous Functions II", 
      //   "Personality Psychology", "Bioinformatics Tools in Psychology", "Fundamentals of Work and Organisational Psychology", "Public Mental Health","Introduction to Clinical Psychology and Psychotherapy", 
      //   "Game Theory in Biopsychology", "Psychopharmacology", "Qualitative Research", "Basics of Educational Psychology", "Psychology Practicum", "Ethics in Psychology and Biopsychology", 
      //   "Selected Biopsychological Topics in the English Language", "Psychology of Problem-Solving", "Evolutionary and Population Genetics", "Mathematical Practicum I", "Computer Practicum", 
      //   "Computer Science I", "Discrete Mathematics I – Set Theory", "Mathematical Topics in English I", "Algebra III – Abstract Algebra", "Physics", "Computer Science II", "Probability", 
      //   "Algebra IV - Algebraic Structures", "Analysis IV - Real Analysis", "Mathematical Modelling", "Statistics", "Algebraic Graph Theory", "Differential Equations", "Functional Analysis", 
      //   "Combinatorics", "Geometry", "Optimization Methods", "Permutation Groups", "Graph Theory", "Measure Theory", "Topology", "Selected Topics in Computing Methods and Applications", 
      //   "Selected Topics in Statistics", "Complex Analysis", "Cryptography and Computer Safety", "Mathematics: Methods and Art", "Molecular Modelling", "Optimization Methods in Logistics", 
      //   "Galois Theory", "Symmetric-key Cryptography", "Coding Theory", "Number Theory", "History and Philosophy of Mathematics", "Mathematical Topics in English II", 
      //   "Discrete Mathematics II – Combinatorics","Mathematical Practicum I", "Mathematical Topics in English I", "Computer Practicum", "Algebra III – Abstract Algebra", "Probability", "Microeconomics", 
      //   "Macroeconomics", "Introduction to Numerical Calculations", "Finance", "Financial Mathematics", "Game Theory", "Econometrics", "Stochastic Processes I", "Fundamentals of Insurance", 
      //   "Modelling in Macroeconomics", "Statistics", "Financial Topics in English", "Stochastic Processes II", "Operations Research", "Risk Management", "EU Economic Trends", "General Botany", 
      //   "General Zoology", "General and Inorganic Chemistry", "Mathematics", "Introduction to Computer Science", "Basic Physics with Biophysics", "Plant Physiology", "Animal Physiology", 
      //   "Introduction to Microbiology", "Internal Elective course I", "Biodiversity", "Introduction to Genetics and Genomics", "Statistics", "Organic Chemistry and Biochemistry", "Sistematic Zoology", 
      //   "Systematic Botany and Geobotany", "Study Practise in Basic Research Methodology (3 weeks)", "Evolution Biology", "Applied Mathematics in Natural Science", "Ecology", "Conservation Biology", 
      //   "Biogeography", "Protected Areas and Sustainable Use", "Biodiversity and Ecology of the Mediterranean", "Biology and Diversity of Vertebrates", "Biological Topics in English", 
      //   "Methodology and Communication in Biological Sciences", "Geographical Information Science and Systems", "Marine Biodiversity"
      // ],
      comments: [], // Stores the list of user comments
      editMode: false, // Indicates whether edit mode is active
      currentCommentId: null, // The ID of the comment currently being edited
      status: {
        success: null,
        msg: "",
      },
      bok: [], boktorateid: 0,
    };
  }

  // Lifecycle method to fetch comments when the component mounts
  componentDidMount() {
    this.fetchComments();
    axios.get(`${API_URL}/reviews/all-books`)
      .then(res => {
        this.setState({ bok: res.data.books });
        // console.log(res.data.books)
      })
      .catch(err => {
        console.error("Error fetching comments:", err);
      });


  }

  // Fetches comments from the server and updates the state
  fetchComments = () => {
    axios.get(`${API_URL}/reviews`)
      .then(res => {
        this.setState({ comments: res.data.reviews });
      })
      .catch(err => {
        console.error("Error fetching comments:", err);
      });
  };

  // Handles changes in the comment input field
  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  // Handles changes in the book title selection
  handleTitleChange = (event) => {
    this.setState({ boktorateid: event.target.value });
  };

  // Updates the rating or resets it if the same rating is selected
  changeRating = (newRating) => {
    this.setState((prevState) => ({
      rating: prevState.rating === newRating ? 0 : newRating
    }));
  };

  // Saves a new comment or updates an existing comment
  saveComment = () => {
    const { comment, title, rating, editMode, currentCommentId, boktorateid } = this.state;

    // if (!title || !comment) {
    //   alert("Please select a book and write a comment before submitting.");
    //   return;
    // }

    const user = localStorage.getItem("username")

    const data = { comment, title, rating, currentCommentId, user, boktorateid };

    if (editMode) {
      // Update existing comment
      axios.post(`${API_URL}/reviews/`, data)
        .then(res => {
          this.setState({ status: res.data })
          console.log("Comment updated:", res.data);
          this.resetForm();
        })
        .catch(err => {
          this.setState({ status: err.response.data })
          console.error("Error updating comment:", err);
        });
    } else {
      // Save new comment
      axios.post(`${API_URL}/reviews`, data)
        .then(res => {
          console.log("Comment saved:", res.data);
          this.setState({ status: res.data })
          this.resetForm();
        })
        .catch(err => {
          this.setState({ status: err.response.data })
          console.log(err.response.data)
          console.error("Error saving comment:", err);
        });
    }
  };

  // Prepares the component for editing an existing comment
  editComment = (comment) => {
    console.log(comment)
    this.setState({
      comment: comment.comment,
      title: comment.title,
      rating: comment.star,
      editMode: true,
      currentCommentId: comment.id,
      boktorateid: comment.id
    });
  };

  // Deletes a comment and refetches the comments list
  deleteComment = (commentId) => {
    axios.delete(`${API_URL}/reviews/${commentId}`)
      .then(res => {
        console.log("Comment deleted:", res.data);
        this.fetchComments();
      })
      .catch(err => {
        console.error("Error deleting comment:", err);
      });
  };

  // Resets the form to its initial state
  resetForm = () => {
    this.setState({ comment: "", title: "", rating: 0, editMode: false, currentCommentId: null });
    this.fetchComments(); // Refresh the comments list
  };

  render() {
    const { rating, starColors, books, comments, editMode } = this.state;

    return (
      <div className="card" style={{ margin: "10px", padding: "20px" }}>
        <h3 style={{ margin: "10px" }}>{editMode ? "Edit your comment" : "Write a comment for a book"}</h3>
        <div className="mb-3" style={{ margin: "10px" }}>
          {/* Book title selection */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Name of the book</label>
            <select
              name="boktorateid"
              id="boktorateid"
              onChange={this.handleTitleChange}
              className="form-control"
              value={this.state.title}
            >
              <option value="" disabled>Select a book</option>
              {this.state.bok.map((book, index) => (
                <option key={index} value={book.id}>{book.title}</option>
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
            onClick={() => this.saveComment()}
            style={{ marginTop: "10px", backgroundColor: '#003f5c', borderColor: '#003f5c' }}
          >
            {editMode ? "Update comment" : "Save comment and rating"}
          </button>
        </div>

        {/* Display existing comments */}
        {this.state.status.success ? <p className="alert alert-success"
          role="alert">{this.state.status.msg}</p> : null}

        {!this.state.status.success && this.state.status.msg !== "" ? <p className="alert alert-danger"
          role="alert">{this.state.status.msg}</p> : null}
        <div style={{ marginTop: "20px" }}>
          <h4>Your Comments</h4>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="comment-card" style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd" }}>
                <h5>{comment.title}</h5>
                <p>{comment.comment}</p>
                <div style={{ fontSize: 18 }}>
                  <StarRatings
                    rating={comment.rating}
                    starRatedColor={starColors[comment.rating - 1]}
                    numberOfStars={5}
                    name='rating'
                    starDimension="20px"
                    starSpacing="5px"
                    starHoverColor={starColors[comment.rating - 1]}
                    isSelectable={false}
                  />
                </div>
                <button
                  className="btn btn-warning"
                  onClick={() => this.editComment(comment)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

      </div>
    );
  }
}

export default Rating