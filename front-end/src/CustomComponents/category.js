import React from "react";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: null, // Currently selected category
            selectedSubcategory: null, // Currently selected subcategory
            selectedDeeperSubcategory: null, // Currently selected deeper subcategory
            selectedBook: null, // Currently selected book
            searchQuery: "",
            subcategories: {
                "UP FAMNIT": {
                    "Bachelor degree": {
                        "Bioinformatics": [
                            "Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus", "Algebra I – Matrix Calculus",
                            "Algebra II – Linear Algebra", "Computer Practicum", "Programming I", "Theoretical Computer Science I",
                            "Data Programming", "Organic Chemistry and Biochemistry", "Genetics", "Data Structures and Algorithms",
                            "Introduction to Bioinformatics", "Introduction to Database Systems", "Foundations of Physics with Biophysics",
                            "Analysis III – Functions of Many Variables", "Statistics", "Algorithms in Bioinformatics",
                            "Introduction to Machine Learning and Data Mining", "Programming II – Concepts of Programming Languages",
                            "Nucleotide Sequence Analysis", "Structure of Biological Molecules", "Biotechnology", "Evolutionary and Population Genetics",
                            "Systems III – Information Systems", "Evolutionary Biology", "Physical Chemistry with Cheminformatics",
                            "Functional Genomics", "Mathematical Modelling in Bioinformatics"
                        ],
                        "Biopsychology": [
                            "Foundations of Psychology", "Differential Psychology", "Basics of Biopsychology", "Psychology of Rational Thinking and Logic",
                            "Developmental Psychology I", "Neurological Bases of Higher Nervous Functions I", "Evolutionary Psychology",
                            "Statistics for Psychologists", "Research Methodology in Psychology", "Cognitive Psychology", "Biochemistry and Genetics in Biopsychology",
                            "Social Psychology I", "Psychological Diagnostics", "Biopsychology of Motivation and Emotions", "Developmental Psychology II",
                            "Psychometrics", "Mental Health, Mental Disorders", "Neurological Bases of Higher Nervous Functions II",
                            "Personality Psychology", "Bioinformatics Tools in Psychology", "Fundamentals of Work and Organisational Psychology",
                            "Public Mental Health", "Introduction to Clinical Psychology and Psychotherapy", "Game Theory in Biopsychology",
                            "Psychopharmacology", "Qualitative Research", "Basics of Educational Psychology", "Psychology Practicum",
                            "Ethics in Psychology and Biopsychology", "Selected Biopsychological Topics in the English Language", "Psychology of Problem-Solving",
                            "Evolutionary and Population Genetics"
                        ],
                        "Mathematics": [
                            "Algebra I - Matrix Calculus", "Algebra II – Linear Algebra", "Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus",
                            "Discrete Mathematics II – Combinatorics", "Mathematical Practicum I", "Computer Practicum", "Computer Science I",
                            "Discrete Mathematics I – Set Theory", "Mathematical Topics in English I", "Algebra III – Abstract Algebra",
                            "Analysis III – Functions of Many Variables", "Physics", "Introduction to Numerical Calculations", "Computer Science II",
                            "Probability", "Algebra IV - Algebraic Structures", "Analysis IV - Real Analysis", "Mathematical Modelling",
                            "Statistics", "Algebraic Graph Theory", "Differential Equations", "Functional Analysis", "Combinatorics", "Geometry",
                            "Optimization Methods", "Permutation Groups", "Graph Theory", "Measure Theory", "Topology",
                            "Selected Topics in Computing Methods and Applications", "Selected Topics in Statistics", "Complex Analysis",
                            "Cryptography and Computer Safety", "Mathematics: Methods and Art", "Molecular Modelling", "Optimization Methods in Logistics",
                            "Galois Theory", "Symmetric-key Cryptography", "Coding Theory", "Number Theory", "History and Philosophy of Mathematics",
                            "Mathematical Topics in English II"
                        ],
                        "Mathematics in Economics and Finance": [
                            "Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus", "Algebra I - Matrix Calculus", "Algebra II – Linear Algebra",
                            "Discrete Mathematics I – Set Theory", "Discrete Mathematics II – Combinatorics", "Mathematical Practicum I", "Mathematical Topics in English I",
                            "Computer Science I", "Computer Practicum", "Analysis III – Functions of Many Variables", "Algebra III – Abstract Algebra",
                            "Probability", "Microeconomics", "Macroeconomics", "Introduction to Numerical Calculations", "Computer Science II",
                            "Finance", "Financial Mathematics", "Game Theory", "Econometrics", "Stochastic Processes I", "Fundamentals of Insurance",
                            "Modelling in Macroeconomics", "Statistics", "Financial Topics in English", "Stochastic Processes II", "Operations Research",
                            "Risk Management", "EU Economic Trends"
                        ],
                        "Computer Science": [
                            "Mathematics I - Analysis I", "Mathematics II - Algebra I", "Theoretical Computer Science I – Discrete Structures",
                            "Theoretical Computer Science II – Formal Languages and Computability", "Programming I", "Programming II – Concepts of Programming Languages",
                            "Systems I – Hardware", "Systems II – Operating Systems and Computer Networks", "Computer Practicum I", "Computer Practicum II",
                            "Mathematics III – Algebra II", "Mathematics IV – Combinatorics with Graph Theory", "Data Structures and Algorithms",
                            "Programming III – Concurrent Programming", "Systems III – Information Systems", "Introduction to Database Systems", "Computer Networks",
                            "Theoretical Computer Science III – Information Theory", "Software Engineering", "Information Technology Management", "Augmented Reality",
                            "Language Technologies", "Multimedia Design", "Geographic Information Systems", "Human–Computer Interaction",
                            "Introduction to Machine Learning and Data Mining", "Decision Support Systems", "Adaptive Interactive Systems"
                        ],
                        "Conservation Biology": [
                            "General Botany", "General Zoology", "General and Inorganic Chemistry", "Mathematics", "Introduction to Computer Science",
                            "Basic Physics with Biophysics", "Plant Physiology", "Animal Physiology", "Introduction to Microbiology", "Internal Elective course I",
                            "Biodiversity", "Introduction to Genetics and Genomics", "Statistics", "Organic Chemistry and Biochemistry", "Sistematic Zoology",
                            "Systematic Botany and Geobotany", "Study Practise in Basic Research Methodology (3 weeks)", "Evolution Biology",
                            "Applied Mathematics in Natural Science", "Ecology", "Conservation Biology", "Biogeography", "Protected Areas and Sustainable Use",
                            "Biodiversity and Ecology of the Mediterranean", "Biology and Diversity of Vertebrates", "Biological Topics in English",
                            "Methodology and Communication in Biological Sciences", "Geographical Information Science and Systems", "Marine Biodiversity"
                        ]
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
        if (Array.isArray(this.state.subcategories[this.state.selectedCategory][this.state.selectedSubcategory])) {
            this.setState({ 
                selectedBook: deeperSubcategory 
            });
        } else {
            this.setState({ 
                selectedDeeperSubcategory: deeperSubcategory, 
                selectedBook: null 
            });
        }
    };

    // Handler for selecting a book
    handleBookClick = (bookName) => {
        this.setState({ 
            selectedBook: bookName,
            selectedDeeperSubcategory: null, 
            selectedSubcategory: null, 
            selectedCategory: null 
        });
    };

    // Filter books based on search query
    filterBooks = (books) => {
        const { searchQuery } = this.state;
        return books.filter(book => book.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    // Handle search query change
    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    // Go back to the previous view
    handleBack = () => {
        if (this.state.selectedBook) {
            this.setState({ 
                selectedBook: null, 
                selectedDeeperSubcategory: null 
            });
        } else if (this.state.selectedDeeperSubcategory) {
            this.setState({ 
                selectedDeeperSubcategory: null 
            });
        } else if (this.state.selectedSubcategory) {
            this.setState({ 
                selectedSubcategory: null 
            });
        } else if (this.state.selectedCategory) {
            this.setState({ 
                selectedCategory: null 
            });
        }
    };

    // Get color based on book name
    getBookColor = (bookName) => {
        const colors = ["#003F5C", "#006400", "#FF0000", "#FFA500", "#800080"];
        return colors[bookName.length % colors.length];
    };

    // Render individual book item
    renderBook = (book) => (
        <div 
            key={book}
            style={{ 
                padding: "10px",
                backgroundColor: this.getBookColor(book),
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            onClick={() => this.handleBookClick(book)}
        >
            {book}
        </div>
    );

    render() {
        const { selectedCategory, selectedSubcategory, selectedDeeperSubcategory, selectedBook, subcategories } = this.state;
        const books = selectedCategory && selectedSubcategory && selectedDeeperSubcategory
            ? subcategories[selectedCategory][selectedSubcategory][selectedDeeperSubcategory] || []
            : [];

        return (
            <div style={{ textAlign: "center", position: "relative", minHeight: "100vh" }}>
                {/* Display category selection if no category is selected */}
                {!selectedCategory && !selectedBook ? (
                    <>
                        <h1 style={{ color: "white" }}>Choose one of the libraries below</h1>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Object.keys(subcategories).map((category) => (
                                <div key={category} style={{ margin: "10px", flex: "0 0 calc(33.333% - 20px)" }}>
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
                ) : !selectedSubcategory && !selectedBook ? (
                    <>
                        <h3 style={{ color: "white" }}>Subcategories of {selectedCategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Object.keys(subcategories[selectedCategory]).map((subcategory) => (
                                <div key={subcategory} style={{ margin: "10px", flex: "0 0 calc(33.333% - 20px)" }}>
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
                ) : !selectedDeeperSubcategory && !selectedBook ? (
                    <>
                        <h3 style={{ color: "white" }}>{selectedSubcategory} Subcategories in {selectedCategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {Object.keys(subcategories[selectedCategory][selectedSubcategory]).map((deeperSubcategory) => (
                                <div key={deeperSubcategory} style={{ margin: "10px", flex: "0 0 calc(33.333% - 20px)" }}>
                                    {deeperSubcategory === "Page under construction" ? (
                                        <p style={{ color: "red", fontWeight: "bold" }}>Page under construction</p>
                                    ) : (
                                        <button
                                            className="btn btn-success"
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
                    <>
                        {/* Display the selected book */}
                        <div style={{ margin: "20px" }}>
                            <h3 style={{ color: "white" }}>Selected Book:</h3>
                            <div style={{ 
                                textAlign: "center", 
                                margin: "10px",
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center"
                            }}>
                                <div style={{ 
                                    width: "80%", 
                                    height: "200px",
                                    backgroundColor: this.getBookColor(selectedBook), 
                                    color: "white", 
                                    borderRadius: "10px", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    fontSize: "24px", // Larger font size
                                    fontWeight: "bold", 
                                    boxSizing: "border-box",
                                }}>
                                    {selectedBook}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Display search input */}
                        <div style={{ margin: "20px 0" }}>
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={this.state.searchQuery}
                                onChange={this.handleSearchChange}
                                style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    width: "300px"
                                }}
                            />
                        </div>

                        {/* Display books */}
                        <h3 style={{ color: "white" }}>Books in {selectedDeeperSubcategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {this.filterBooks(books).map((book) => (
                                <div key={book} style={{ margin: "10px", flex: "0 0 calc(25% - 20px)" }}>
                                    {this.renderBook(book)}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Display the current path */}
                {selectedBook && (
                    <button
                        className="btn btn-danger"
                        style={{
                            position: "fixed",
                            bottom: "10px",
                            left: "10px",
                            padding: "10px",
                            fontSize: "16px",
                            backgroundColor: "#003f5c",
                            border: "2px solid #003f5c",
                            color: "#ffffff",
                            borderRadius: "8px",
                            zIndex: 1000
                        }}
                        onClick={this.handleBack}
                    >
                        Back
                    </button>
                )}
            </div>
        );
    }
}

export default Category;