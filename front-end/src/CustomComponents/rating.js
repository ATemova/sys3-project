import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./Rating.css";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            error: ""
        };
    }

    // Function to set rating
    setRating = (rating) => {
        this.setState({ rating, error: "" });  // Clear error when rating is set
    }

    // Function to submit review
    submitReview = () => {
        const { rating } = this.state;

        if (rating === 0) {
            this.setState({ error: "Please rate the web application" });
            return;
        }

        // Simulate sending review data to backend
        // Replace with actual API call if required
        console.log("Rating:", rating);

        // Clear the error after submission
        this.setState({ error: "" });
    }

    render() {
        const { rating, error } = this.state;

        return (
            <div>
                {/* Star rating */}
                <div className="star-rating">
                    {[...Array(5)].map((_, index) => {
                        const starRating = index + 1;
                        const starClass = starRating <= rating ? 'star filled' : 'star';

                        return (
                            <span
                                key={starRating}
                                className={starClass}
                                onClick={() => this.setRating(starRating)}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>

                {/* Error message */}
                {error && (
                    // eslint-disable-next-line no-unused-expressions
                    <div className="error-message">{error}</div>
                )}

                {/* Submit button */}
                <button
                    onClick={this.submitReview}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#003f5c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Submit
                </button>
            </div>
        );
    }
}

Rating.propTypes = {
    QIDFromChild: PropTypes.func.isRequired
}

export default Rating;