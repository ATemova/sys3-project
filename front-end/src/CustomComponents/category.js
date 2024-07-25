import React from "react";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: null,
            selectedSubcategory: null,
            selectedDeeperSubcategory: null,
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
                        "Nature Conservation": {
                            "Page under construction": []
                        },
                    },
                },
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

    handleClick = (category) => {
        console.log("Category selected:", category);
        this.setState({ selectedCategory: category, selectedSubcategory: null, selectedDeeperSubcategory: null });
    };

    handleSubcategoryClick = (subcategory) => {
        console.log("Subcategory selected:", subcategory);
        this.setState({ selectedSubcategory: subcategory, selectedDeeperSubcategory: null });
    };

    handleDeeperSubcategoryClick = (deeperSubcategory) => {
        console.log("Deeper subcategory selected:", deeperSubcategory);
        this.setState({ selectedDeeperSubcategory: deeperSubcategory });
    };

    handleBack = () => {
        const { selectedDeeperSubcategory, selectedSubcategory } = this.state;
        if (selectedDeeperSubcategory) {
            this.setState({ selectedDeeperSubcategory: null });
        } else if (selectedSubcategory) {
            this.setState({ selectedSubcategory: null });
        } else {
            this.setState({ selectedCategory: null });
        }
    };

    render() {
        const { selectedCategory, selectedSubcategory, selectedDeeperSubcategory, subcategories } = this.state;

        const pageUnderConstructionStyle = {
            color: "red",
            fontWeight: "bold",
            fontSize: "18px" // Adjust size as needed
        };

        return (
            <div style={{ textAlign: "center" }}>
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
                                        <p style={pageUnderConstructionStyle}>Page under construction</p>
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
                        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
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
                    </>
                ) : !selectedDeeperSubcategory ? (
                    <>
                        <h3>Subcategories of {selectedSubcategory} in {selectedCategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Object.keys(subcategories[selectedCategory][selectedSubcategory]).map((deeperSubcategory) => (
                                <div key={deeperSubcategory} style={{ margin: "10px 5px", width: "calc(100% / 3 - 20px)" }}>
                                    {deeperSubcategory === "Page under construction" ? (
                                        <p style={pageUnderConstructionStyle}>Page under construction</p>
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
                        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
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
                    </>
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
                                                backgroundColor: "#003f5c",
                                                border: "2px solid #003f5c",
                                                color: "#ffffff",
                                                borderRadius: "5px"
                                            }}
                                            onClick={() => console.log(`Selected: ${book}`)}
                                        >
                                            {book}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p style={pageUnderConstructionStyle}>Page under construction</p>
                            )}
                        </div>
                        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
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
                    </>
                )}
            </div>
        );
    }
}

export default Category;