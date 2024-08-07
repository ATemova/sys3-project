import React from "react";

class Category extends React.Component {
    constructor(props) {
        super(props);
        // Initialize component state
        this.state = {
            selectedCategory: null,
            selectedSubcategory: null,
            selectedDeeperSubcategory: null,
            selectedBook: null,
            // Hierarchical structure for categories and subcategories
            subcategories: {
                "UP FAMNIT": {
                    "Bachelor degree": {
                        "Bioinformatics": {
                            "Page under construction": []
                        },
                        "Biopsychology": {
                            "Page under construction": []
                        },
                        "Mathematics": {
                            "Page under construction": []
                        },
                        "Mathematics in Economics and Finance": {
                            "Page under construction": []
                        },
                        "Computer Science": ["Mathematics I - Analysis I", "Mathematics II - Algebra I", "Theoretical Computer Science I – Discrete Structures", "Theoretical Computer Science II – Formal Languages and Computability", 
                            "Programming I", "Programming II – Concepts of Programming Languages", "Systems I – Hardware", "Systems II – Operating Systems and Computer Networks", "Computer Practicum I", "Computer Practicum II", 
                            "Mathematics III – Algebra II", "Mathematics IV – Combinatorics with Graph Theory", "Data Structures and Algorithms", "Programming III – Concurrent Programming", "Systems III – Information Systems", 
                            "Introduction to Database Systems", "Computer Networks", "Theoretical Computer Science III – Information Theory", "Software Engineering", "Information Technology Management", "Augmented Reality", 
                            "Language Technologies", "Multimedia Design", "Geographic Information Systems", "Human–Computer Interaction", "Introduction to Machine Learning and Data Mining", 
                            "Decision Support Systems", "Adaptive Interactive Systems"],
                        "Conservation Biology": {
                            "Page under construction": []
                        },
                    },
                    "Master degree": {
                        "Biopsychology": {
                            "Page under construction": []
                        },
                        "Mathematical Sciences": {
                            "Page under construction": []
                        },
                        "Mathematics with Financial Engineering": {
                            "Page under construction": []
                        },
                        "Data Science": {
                            "Page under construction": []
                        },
                        "Computer Science": {
                            "Page under construction": []
                        },
                        "Sustainable Built Environments": {
                            "Page under construction": []
                        },
                        "Nature Conservation":{
                            "Page under construction": []
                        },
                    },
                },
                // Other categories follow a similar structure
                "UP FHŠ": {
                    "Bachelor degree": {
                        "Page under construction": []
                    },
                    "Master degree": {
                        "Page under construction": []
                    }
                },
                "UP FM": {
                    "Bachelor degree": {
                        "Page under construction": []
                    },
                    "Master degree": {
                        "Page under construction": []
                    }
                },
                "UP FTŠ": {
                    "Bachelor degree": {
                        "Page under construction": []
                    },
                    "Master degree": {
                        "Page under construction": []
                    }
                },
                "UP FVZ": {
                    "Bachelor degree": {
                        "Page under construction": []
                    },
                    "Master degree": {
                        "Page under construction": []
                    }
                },
                "UP PEF": {
                    "Bachelor degree": {
                        "Page under construction": []
                    },
                    "Master degree": {
                        "Page under construction": []
                    }
                },
            }
        };
    }

    // Handler for category selection
    handleClick = (category) => {
        this.setState({ 
            selectedCategory: category, 
            selectedSubcategory: null, 
            selectedDeeperSubcategory: null, 
            selectedBook: null 
        });
    };

    // Handler for subcategory selection
    handleSubcategoryClick = (subcategory) => {
        this.setState({ 
            selectedSubcategory: subcategory, 
            selectedDeeperSubcategory: null, 
            selectedBook: null 
        });
    };

    // Handler for deeper subcategory or book selection
    handleDeeperSubcategoryClick = (deeperSubcategory) => {
        if (Array.isArray(this.state.subcategories[this.state.selectedCategory][this.state.selectedSubcategory])) {
            this.setState({ selectedBook: deeperSubcategory });
        } else {
            this.setState({ 
                selectedDeeperSubcategory: deeperSubcategory, 
                selectedBook: null 
            });
        }
    };

    // Handler for book selection
    handleBookClick = (bookName) => {
        this.setState({ selectedBook: bookName });
    };

    // Handler to navigate back to previous state
    handleBack = () => {
        const { selectedBook, selectedDeeperSubcategory, selectedSubcategory, selectedCategory } = this.state;
        if (selectedBook) {
            this.setState({ selectedBook: null });
        } else if (selectedDeeperSubcategory) {
            this.setState({ selectedDeeperSubcategory: null });
        } else if (selectedSubcategory) {
            this.setState({ selectedSubcategory: null });
        } else if (selectedCategory) {
            this.setState({ selectedCategory: null });
        }
    };

    // Determines the color of a book based on its name
    getBookColor = (bookName) => {
        if (bookName.toLowerCase().includes("math")) return "green";
        if (bookName.toLowerCase().includes("programming") || bookName.toLowerCase().includes("computer")) return "#003f5c";
        if (bookName.toLowerCase().includes("theoretical") || bookName.toLowerCase().includes("systems")) return "red";
        return "orange";
    };

    // Renders a book with appropriate styling
    renderBook = (bookName) => (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div style={{ 
                width: "300px", 
                height: "300px", 
                backgroundColor: this.getBookColor(bookName), 
                color: "white", 
                borderRadius: "10px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "18px", 
                fontWeight: "bold", 
                margin: "0 auto"
            }}>
                {bookName}
            </div>
        </div>
    );

    render() {
        const { selectedCategory, selectedSubcategory, selectedDeeperSubcategory, selectedBook, subcategories } = this.state;

        return (
            <div style={{ textAlign: "center", position: "relative", minHeight: "100vh" }}>
                {/* Display category selection if no category is selected */}
                {!selectedCategory ? (
                    <>
                        <h1>Choose one of the libraries below</h1>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Object.keys(subcategories).map((category) => (
                                <div key={category} style={{ margin: "10px 5px", width: "calc(100% / 3 - 20px)" }}>
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            fontSize: "16px",
                                            backgroundColor: "#003f5c",
                                            border: "2px solid #003f5c",
                                            color: "#ffffff",
                                            borderRadius: "5px"
                                        }}
                                        onClick={() => this.handleClick(category)}
                                    >
                                        {category}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : !selectedSubcategory ? (
                    <>
                        <h3>Subcategories of {selectedCategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Object.keys(subcategories[selectedCategory]).map((subcategory) => (
                                <div key={subcategory} style={{ margin: "10px 5px", width: "calc(100% / 3 - 20px)" }}>
                                    {subcategory === "Page under construction" ? (
                                        <p style={{ color: "red", fontWeight: "bold" }}>Page under construction</p>
                                    ) : (
                                        <button
                                            className="btn btn-secondary"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                fontSize: "16px",
                                                backgroundColor: "#003f5c",
                                                border: "2px solid #003f5c",
                                                color: "#ffffff",
                                                borderRadius: "5px"
                                            }}
                                            onClick={() => this.handleSubcategoryClick(subcategory)}
                                        >
                                            {subcategory}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : !selectedDeeperSubcategory ? (
                    <>
                        <h3>{selectedSubcategory} Subcategories in {selectedCategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Object.keys(subcategories[selectedCategory][selectedSubcategory]).map((deeperSubcategory) => (
                                <div key={deeperSubcategory} style={{ margin: "10px 5px", width: "calc(100% / 3 - 20px)" }}>
                                    {deeperSubcategory === "Page under construction" ? (
                                        <p style={{ color: "red", fontWeight: "bold" }}>Page under construction</p>
                                    ) : (
                                        <button
                                            className="btn btn-secondary"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                fontSize: "16px",
                                                backgroundColor: "#003f5c",
                                                border: "2px solid #003f5c",
                                                color: "#ffffff",
                                                borderRadius: "5px"
                                            }}
                                            onClick={() => this.handleDeeperSubcategoryClick(deeperSubcategory)}
                                        >
                                            {deeperSubcategory}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : selectedBook ? (
                    // Render the selected book
                    this.renderBook(selectedBook)
                ) : (
                    <>
                        <h3>Books for {selectedDeeperSubcategory} in {selectedSubcategory} of {selectedCategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Array.isArray(subcategories[selectedCategory][selectedSubcategory][selectedDeeperSubcategory]) ? (
                                subcategories[selectedCategory][selectedSubcategory][selectedDeeperSubcategory].map((book) => (
                                    <div key={book} style={{ margin: "10px 5px", width: "calc(100% / 3 - 20px)" }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                fontSize: "16px",
                                                backgroundColor: this.getBookColor(book),
                                                border: "2px solid #003f5c",
                                                color: "#ffffff",
                                                borderRadius: "5px"
                                            }}
                                            onClick={() => this.handleBookClick(book)}
                                        >
                                            {book}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: "red", fontWeight: "bold" }}>Page under construction</p>
                            )}
                        </div>
                    </>
                )}
                {/* Back button for navigation */}
                <div style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    width: "auto",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <button
                        className="btn btn-secondary"
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            backgroundColor: "#003f5c",
                            border: "2px solid #003f5c",
                            color: "#ffffff",
                            borderRadius: "5px"
                        }}
                        onClick={this.handleBack}
                    >
                        ← Back
                    </button>
                </div>
            </div>
        );
    }
}

export default Category;