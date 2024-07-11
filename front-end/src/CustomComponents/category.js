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
                        "Bioinformatics": ["Analysis I – Foundations of Analysis", "Analysis II – Infinitesimal Calculus", "Algebra I – Matrix Calculus", "Algebra II – Linear Algebra", "Computer Practicum", 
                            "Programming I", "Theoretical Computer Science I", "Data Programming", "Organic Chemistry and Biochemistry", "Genetics", "Data Structures and Algorithms", "Introduction to Bioinformatics", 
                            "Introduction to Database Systems", "Foundations of Physics with Biophysics", "Analysis III – Functions of Many Variables", "Statistics", "Algorithms in Bioinformatics", 
                            "Introduction to Machine Learning and Data Mining", "Programming II – Concepts of Programming Languages", "Nucleotide Sequence Analysis", "Structure of Biological Molecules", 
                            "Biotechnology", "Evolutionary and Population Genetics", "Systems III – Information Systems", "Evolutionary Biology", "Physical Chemistry with Cheminformatics", "Functional Genomics", 
                            "Mathematical Modelling in Bioinformatics"],
                        "Biopsychology": ["Foundations of Psychology", "Differential Psychology", "Basics of Biopsychology", "Psychology of Rational Thinking and Logic", "Developmental Psychology I", 
                            "Neurological Bases of Higher Nervous Functions I","Evolutionary Psychology", "Statistics for Psychologists", "Research Methodology in Psychology", "Cognitive Psychology", 
                            "Biochemistry and Genetics in Biopsychology", "Social Psychology I", "Psychological Diagnostics", "Biopsychology of Motivation and Emotions","Developmental Psychology II", "Psychometrics", 
                            "Mental Health, Mental Disorders", "Neurological Bases of Higher Nervous Functions II","Personality Psychology", "Bioinformatics Tools in Psychology", 
                            "Fundamentals of Work and Organisational Psychology", "Public Mental Health","Introduction to Clinical Psychology and Psychotherapy", "Game Theory in Biopsychology", "Psychopharmacology", 
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
                            "Discrete Mathematics I – Set Theory", "Discrete Mathematics II – Combinatorics","Mathematical Practicum I", "Mathematical Topics in English I", "Computer Science I", "Computer Practicum",
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
                        "Biopsychology": ["Clinical Psychology", "Research Design and Statical Data", "Interaction and User Experience", "Biopsychology", "Learning and Memoty", "Psychotherapeutic Approaches and Psychotherapy", 
                            "Behavioural Genetics", "Advance Modeling in Psychology", "Health Psychology", "Research Methods in Neuroscience", "Advanced Statistical Methods in Psychology", "Molecular Basis of Neurodegeneration", 
                            "Psychopharmacology of Mental Disorders", "Public-Health Interventions: Selected Topics", "Positive Psychology", "Cognitive Behavioral Therapy", "Sports psychology", 
                            "Psychology of sexual and reproductive health"],
                        "Mathematical Sciences": ["Selected Topics in Algebra (1)", "Selected Topics in Analysis (1)", "Selected Topics in Discrete Mathematics (1)", "Selected Topics in Financial Mathematics (1)", 
                            "Selected Topics in Cryptography (1)", "Selected Topics in Mathematical Statistics (1)", "Molecular Modeling Course", "Selected Topics in Functional Analysis", "Mathematical Practicum", 
                            "Algebraic Combinatorics", "Elliptic Curves in Cryptography", "Philosophy", "Healthcare Financing", "Geometry and Topology", "Geometric Measure Theory", 
                            "Geometric Aspects in Discrete Dynamical Systems", "Geometrical Optimization Problems", "Groups, Covers and Maps", "Selected Topics in Algebra (2)", "Selected Topics in Partial Differential Equations", 
                            "Selected Topics in Dynamical Systems", "Selected Topics in Discrete Mathematics (2)", "Selected Topics in Complex Analysis", "Selected Topics in Mathematical Statistics (2)", 
                            "Selected Topics in Numerical Mathematics", "Selected Topics in Theory of Association Schemes", "Selected Topics in Theory of Finite Geometries", "Selected Topics in Number Theory", 
                            "Selected Topics in Topology", "Selected Topics in Computing Methods and Applications", "Chaotic Dynamical Systems", "Characters of Finite Groups", "Combinatorial and Convex Geometries", 
                            "Combined Quantum and Classical Methods for Molecular Simulations", "Cryptographic Hash Functions and Block Chains", "Lie Groups and Lie Algebras", "Mathematical Modelling", 
                            "Mathematical Finances in Real Time", "Mathematical Topics in a Foreign Language", "Molecular Dynamics Simulation Methods", "Molecular Graphics", "Computer Aided Geometric Design", 
                            "Symmetry and Traversability in Graphs", "Stochastic Processes", "Game Theory", "Coding Theory", "Theory of Finite Fields", "Measure Theory", "Theory of Permutation Groups", 
                            "Project Managemenet", "Introduction to Public-key Cryptography", "Introduction to Public-key Cryptograph", "Probability with Measure (1)", "Probability with Measure (2)", "Probability", 
                            "History and Methodology of the Subject"],
                        "Mathematics with Financial Engineering": ["Selected Topics of Analysis", "Mathematical Modelling", "Probability II", "Financial Markets", "Selected Topics in Algebra", 
                            "Selected Topics in Discrete Mathematics", "Statistical Practicum", "Statistics", "Stochastic Processes", "Game Theory", "Asset Pricing", "Valuation of Insurance Products", 
                            "Financial Engineering Practicum", "Selected Topics in Theory of Finite Geometries", "Selected Topics in Number Theory"],
                        "Data Science": ["Data Engineering and Distributed Information Systems", "Data Science Ethics", "Mathematical Practicum", "Selected Topics in Discrete Mathematics", "Statistics", 
                            "Selected Topics in Information Visualisation", "Intelligent System", "Data Practicum I", "Databases for Big Data", "Data Science Seminar I", "Data Science Seminar II", 
                            "Selected Topics in Numerical Mathematics", "Mining Massive Data", "Data Practicum II", "Collection and Integration of Sensor Data", "Security", "Selected Topics on Data Processing *", 
                            "Selected Topics on Data Acquisition *", "Selected Topics on Data Vizualisation II *", "Big Data in Structural Bioinformatics", "Foundations of Data Science and Artificial Intelligence"],
                        "Computer Science": ["Selected Topics in Theoretical Computer Science", "Selected Topics in Theory of Algorithms", "Intelligent Systems", "Applied Statistics", "Graph Algorithms", 
                            "Selected Topics in Image Processing", "Selected Topics in Information Visualisation", "Selected Topics in Information Visualisation", "Computer Vision", "Computational Social Science"],
                        "Sustainable Built Environments": ["Mathematics", "Building Physics", "Construction Materials", "Wood Science and Technology", "Renewable and Wood-based Materials in Construction", "Statistics", 
                            "Wood Composites", "Forest Products Value Chain", "Building Energy Simulation", "Energy Efficient Building Design", "Wood Design and Structural Analysis", "Sustainable and Restorative Environments", 
                            "Energy Refurbishment of Buildings", "Ergonomics and Built Environment", "Non-destructive Testing", "Modern History of Sustainable Architecture", "Forest Products Marketing", 
                            "The Industrial Ecology of Timber", "Principles of Innovation and Creativity", "Advanced Construction Products", "Structural Systems of Timber Building", "Sustainable Geotechnics", 
                            "Recycled Waste in Construction", "Fire Science Laboratory", "Bioinspired Material Design"],
                        "Nature Conservation": ["Advanced Topics in Conservation Biology", "The Human Dimension in Conservation Sciences", "Marine Ecology", "Ecology of Terrestrial Ecosystems", 
                            "Conservation of Terrestrial Ecosystems", "Marine Conservation Biology", "Population Biology", "Ecology of Mediterranean Forest Ecosystems", "Agroecology", "Selected Topics in Terrestrial Zoology", 
                            "Ornithology", "Paleoecology", "Floral Biology and Pollination Ecology", "Entomology", "Herpetology", "Selected Topics in Marine Zoology", "Marine Botany", "Marine Protected Areas: Social Aspects", 
                            "Biotic Globalisation in Oceans", "Marine Ecotoxicology", "Conservation Ecology of Marine Mammals", "Ecophysiology of Marine Animals", "Field Practicum", "Biological Monitoring", 
                            "Biology and Conservation of Large Vertebrates", "Wildlife Health", "Laboratory Practicum", "Multivariate Statistics in Ecology and Nature Conservation"]
                    },

                },
            }
        };
    }

    handleClick = (category) => {
        this.setState({ selectedCategory: category, selectedSubcategory: null, selectedDeeperSubcategory: null });
    };

    handleSubcategoryClick = (subcategory) => {
        this.setState({ selectedSubcategory: subcategory, selectedDeeperSubcategory: null });
    };

    handleDeeperSubcategoryClick = (deeperSubcategory) => {
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

        return (
            <div style={{ textAlign: "center" }}>
                {!selectedCategory ? (
                    <>
                        <h1>Explore the UP FAMNIT library</h1>
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
                            {this.state.subcategories[selectedCategory][selectedSubcategory][selectedDeeperSubcategory].map((book, index) => (
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
                )}
            </div>
        );
    }
}

export default Category;