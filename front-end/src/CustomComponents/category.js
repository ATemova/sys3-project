import React from "react";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: null, //Currently selected category
            selectedSubcategory: null, //Currently selected subcategory
            selectedDeeperSubcategory: null, //Currently selected deeper subcategory
            selectedBook: null, //Currently selected book
            searchQuery: "",
            subcategories: {
                "UP FAMNIT": {
                    "Bachelor degree": {
                        "Bioinformatics": ["Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus", "Algebra I – Matrix Calculus", "Algebra II – Linear Algebra", "Computer Practicum",
                            "Programming I", "Theoretical Computer Science I", "Data Programming", "Organic Chemistry and Biochemistry", "Genetics", "Data Structures and Algorithms", "Introduction to Bioinformatics",
                            "Introduction to Database Systems", "Foundations of Physics with Biophysics", "Analysis III – Functions of Many Variables", "Statistics", "Algorithms in Bioinformatics",
                            "Introduction to Machine Learning and Data Mining", "Programming II – Concepts of Programming Languages", "Nucleotide Sequence Analysis", "Structure of Biological Molecules",
                            "Biotechnology", "Evolutionary and Population Genetics", "Systems III – Information Systems", "Evolutionary Biology", "Physical Chemistry with Cheminformatics", "Functional Genomics",
                            "Mathematical Modelling in Bioinformatics"],
                        "Biopsychology": ["Foundations of Psychology", "Differential Psychology", "Basics of Biopsychology", "Psychology of Rational Thinking and Logic", "Developmental Psychology I",
                            "Neurological Bases of Higher Nervous Functions I", "Evolutionary Psychology", "Statistics for Psychologists", "Research Methodology in Psychology", "Cognitive Psychology",
                            "Biochemistry and Genetics in Biopsychology", "Social Psychology I", "Psychological Diagnostics", "Biopsychology of Motivation and Emotions", "Developmental Psychology II", "Psychometrics",
                            "Mental Health, Mental Disorders", "Neurological Bases of Higher Nervous Functions II", "Personality Psychology", "Bioinformatics Tools in Psychology",
                            "Fundamentals of Work and Organisational Psychology", "Public Mental Health", "Introduction to Clinical Psychology and Psychotherapy", "Game Theory in Biopsychology", "Psychopharmacology",
                            "Qualitative Research", "Basics of Educational Psychology", "Psychology Practicum", "Ethics in Psychology and Biopsychology", "Selected Biopsychological Topics in the English Language",
                            "Psychology of Problem-Solving", "Evolutionary and Population Genetics"],
                        "Mathematics": ["Algebra I - Matrix Calculus", "Algebra II – Linear Algebra", "Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus", "Discrete Mathematics II – Combinatorics",
                            "Mathematical Practicum I", "Computer Practicum", "Computer Science I", "Discrete Mathematics I – Set Theory", "Mathematical Topics in English I", "Algebra III – Abstract Algebra",
                            "Analysis III – Functions of Many Variables", "Physics", "Introduction to Numerical Calculations", "Computer Science II", "Probability", "Algebra IV - Algebraic Structures",
                            "Analysis IV - Real Analysis", "Mathematical Modelling", "Statistics", "Algebraic Graph Theory", "Differential Equations", "Functional Analysis", "Combinatorics", "Geometry",
                            "Optimization Methods", "Permutation Groups", "Graph Theory", "Measure Theory", "Topology", "Selected Topics in Computing Methods and Applications", "Selected Topics in Statistics",
                            "Complex Analysis", "Cryptography and Computer Safety", "Mathematics: Methods and Art", "Molecular Modelling", "Optimization Methods in Logistics", "Galois Theory", "Symmetric-key Cryptography",
                            "Coding Theory", "Number Theory", "History and Philosophy of Mathematics", "Mathematical Topics in English II"],
                        "Mathematics in Economics and Finance": ["Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus", "Algebra I - Matrix Calculus", "Algebra II – Linear Algebra",
                            "Discrete Mathematics I – Set Theory", "Discrete Mathematics II – Combinatorics", "Mathematical Practicum I", "Mathematical Topics in English I", "Computer Science I", "Computer Practicum",
                            "Analysis III – Functions of Many Variables", "Algebra III – Abstract Algebra", "Probability", "Microeconomics", "Macroeconomics", "Introduction to Numerical Calculations", "Computer Science II",
                            "Finance", "Financial Mathematics", "Game Theory", "Econometrics", "Stochastic Processes I", "Fundamentals of Insurance", "Modelling in Macroeconomics", "Statistics", "Financial Topics in English",
                            "Stochastic Processes II", "Operations Research", "Risk Management", "EU Economic Trends"],
                        "Computer Science": ["Mathematics I - Analysis I", "Mathematics II - Algebra I", "Theoretical Computer Science I – Discrete Structures", "Theoretical Computer Science II – Formal Languages and Computability",
                            "Programming I", "Programming II – Concepts of Programming Languages", "Systems I – Hardware", "Systems II – Operating Systems and Computer Networks", "Computer Practicum I", "Computer Practicum II",
                            "Mathematics III – Algebra II", "Mathematics IV – Combinatorics with Graph Theory", "Data Structures and Algorithms", "Programming III – Concurrent Programming", "Systems III – Information Systems",
                            "Introduction to Database Systems", "Computer Networks", "Theoretical Computer Science III – Information Theory", "Software Engineering", "Information Technology Management", "Augmented Reality",
                            "Language Technologies", "Multimedia Design", "Geographic Information Systems", "Human–Computer Interaction", "Introduction to Machine Learning and Data Mining",
                            "Decision Support Systems", "Adaptive Interactive Systems"],
                        "Conservation Biology": ["General Botany", "General Zoology", "General and Inorganic Chemistry", "Mathematics", "Introduction to Computer Science", "Basic Physics with Biophysics", "Plant Physiology",
                            "Animal Physiology", "Introduction to Microbiology", "Internal Elective course I", "Biodiversity", "Introduction to Genetics and Genomics", "Statistics", "Organic Chemistry and Biochemistry",
                            "Sistematic Zoology", "Systematic Botany and Geobotany", "Study Practise in Basic Research Methodology (3 weeks)", "Evolution Biology", "Applied Mathematics in Natural Science", "Ecology",
                            "Conservation Biology", "Biogeography", "Protected Areas and Sustainable Use", "Biodiversity and Ecology of the Mediterranean", "Biology and Diversity of Vertebrates", "Biological Topics in English",
                            "Methodology and Communication in Biological Sciences", "Geographical Information Science and Systems", "Marine Biodiversity"]
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

    // Handler for selecting a category
    handleClick = (category) => {
        this.setState({ 
            selectedCategory: category, 
            selectedSubcategory: null, 
            selectedDeeperSubcategory: null, 
            selectedBook: null 
        });
    };

    // Handler for selecting a subcategory
    handleSubcategoryClick = (subcategory) => {
        this.setState({ 
            selectedSubcategory: subcategory, 
            selectedDeeperSubcategory: null, 
            selectedBook: null 
        });
    };

    // Handler for selecting a deeper subcategory or book
    handleDeeperSubcategoryClick = (deeperSubcategory) => {
        // Check if the current selection is a list of books
        if (Array.isArray(this.state.subcategories[this.state.selectedCategory][this.state.selectedSubcategory])) {
            this.setState({ selectedBook: deeperSubcategory });
        } else {
            this.setState({ 
                selectedDeeperSubcategory: deeperSubcategory, 
                selectedBook: null 
            });
        }
    };

    // Handler for selecting a book
    handleBookClick = (bookName) => {
        this.setState({ selectedBook: bookName });
    };

    // Handler for navigating back to the previous state
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
        if (bookName.toLowerCase().includes("math") || bookName.toLowerCase().includes("algebra") || bookName.toLowerCase().includes("analysis") || bookName.toLowerCase().includes("physiology")) return "#7FFFD4";
        if (bookName.toLowerCase().includes("programming") || bookName.toLowerCase().includes("computer") || bookName.toLowerCase().includes("coding") || bookName.toLowerCase().includes("biology")) return "#003F5C";
        if (bookName.toLowerCase().includes("theoretical") || bookName.toLowerCase().includes("systems") || bookName.toLowerCase().includes("theory") || bookName.toLowerCase().includes("general")) return "#FF0000";
        if (bookName.toLowerCase().includes("psychology") || bookName.toLowerCase().includes("english") || bookName.toLowerCase().includes("algorithms")) return "#4D0099";
        return "#FFA500";
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
                                                backgroundColor: "#003f5c",
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
                {/* Display back button if any category or subcategory is selected */}
                {selectedCategory || selectedSubcategory || selectedDeeperSubcategory || selectedBook ? (
                    <button
                        className="btn btn-danger"
                        style={{
                            position: "fixed",
                            left: "10px",
                            bottom: "10px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#003f5c",
                            border: "2px solid #003f5c",
                            color: "#ffffff",
                            borderRadius: "5px"
                        }}
                        onClick={this.handleBack}
                    >
                        Back
                    </button>
                ) : null}
            </div>
        );
    }
}

export default Category;