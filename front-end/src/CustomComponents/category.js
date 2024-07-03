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
                    "Bachelor degree": ["Agronomy", "Bioinformatics", "Biopsychology", "Mathematics",
                        "Mathematics in Economics and Finance", "Computer Science", "Conservation Biology"],
                    "Master degree": ["Biopsychology", "Mathematical Sciences", "Mathematics with Financial Engineering",
                        "Data Science", "Psychology", "Computer Science", "Sustainable Built Environments",
                        "Nature Conservation"],
                    "Doctoral (PhD) degree": ["Mathematical Sciences", "Renewable Materials from Healthy Built Environments",
                        "Computer Science", "Suicidology and Mental Health", "Conservation Biology"]
                },
                "UP FHŠ": {
                    "Bachelor degree": ["Geography", "Italian Studies", "Communication and the Media", "Cultural Heritage",
                        "Intercultural Linguistic Mediation", "Slovene Studies", "History", "Anthropology", "Archaeology"],
                    "Master degree": ["Archaeological Heritage of the Mediterranean", "Geography", "Italian Studies",
                        "Linguistic Mediation and Translation", "Communication and the Media", "Cultural Studies and Anthropology",
                        "History", "Slovene Studies"],
                    "Doctoral (PhD) degree": ["Anthropology", "Archaeology", "Geography", "Language and Interculturality",
                        "Slovene Studies", "Management of Cultural Assets and Archives", "History of Europe and the Mediterranean"]
                },
                "UP FM": {
                    "Bachelor degree": ["Management"],
                    "Master degree": ["Economics and Finances", "Management", "Management of Sustainable Development",
                        "Law for Management", "Political Science - International Relations and Economic Diplomacy"],
                    "Doctoral (PhD) degree": ["Management"]
                },
                "UP FTŠ": {
                    "Bachelor degree": ["Tourism Destination Management", "Tourism Enterprise Management"],
                    "Master degree": ["Tourism", "Heritage Tourism"],
                    "Doctoral (PhD) degree": ["Innovative Tourism"]
                },
                "UP FVZ": {
                    "Bachelor degree": ["Kinesiology", "Nutritional Counselling - Dietetics", "Physiotherapy", "Nursing"],
                    "Master degree": ["Kinesiology", "Dietetics and Clinical Nutrition", "Physiotherapy",
                        "Physical Education", "Nursing"],
                    "Doctoral (PhD) degree": ["Prevention for Health"]
                },
                "UP PEF": {
                    "Bachelor degree": ["Pedagogy", "Pre-school Teaching", "Primary School Teaching", "Social Pedagogy", "Visual Arts and Design"],
                    "Master degree": ["Andragogy", "Inclusive Pedagogics", "Primary School Teaching", "Social Pedagogy",
                        "Visual Arts and Design", "Early Learning"],
                    "Doctoral (PhD) degree": ["Education Sciences", "Early Learning and Teaching"]
                }
            },
            deeperSubcategories: {
                "Agronomy": ["First Year", "Second Year", "Third Year"],
                "Bioinformatics": ["First Year", "Second Year", "Third Year"],
                "Biopsychology": ["First Year", "Second Year", "Third Year"],
                "Mathematics": ["First Year", "Second Year", "Third Year"],
                "Mathematics in Economics and Finance": ["First Year", "Second Year", "Third Year"],
                "Computer Science": ["First Year", "Second Year", "Third Year"],
                "Conservation Biology": ["First Year", "Second Year", "Third Year"],
                "Mathematical Sciences": ["First Year", "Second Year", "Third Year"],
                "Mathematics with Financial Engineering": ["First Year", "Second Year", "Third Year"],
                "Data Science": ["First Year", "Second Year", "Third Year"],
                "Psychology": ["First Year", "Second Year", "Third Year"],
                "Sustainable Built Environments": ["First Year", "Second Year", "Third Year"],
                "Nature Conservation": ["First Year", "Second Year", "Third Year"],
                "Renewable Materials from Healthy Built Environments": ["First Year", "Second Year", "Third Year"],
                "Suicidology and Mental Health": ["First Year", "Second Year", "Third Year"],
                "Geography": ["First Year", "Second Year", "Third Year"],
                "Italian Studies": ["First Year", "Second Year", "Third Year"],
                "Communication and the Media": ["First Year", "Second Year", "Third Year"],
                "Cultural Heritage": ["First Year", "Second Year", "Third Year"],
                "Intercultural Linguistic Mediation": ["First Year", "Second Year", "Third Year"],
                "Slovene Studies": ["First Year", "Second Year", "Third Year"],
                "History": ["First Year", "Second Year", "Third Year"],
                "Anthropology": ["First Year", "Second Year", "Third Year"],
                "Archaeology": ["First Year", "Second Year", "Third Year"],
                "Archaeological Heritage of the Mediterranean": ["First Year", "Second Year", "Third Year"],
                "Linguistic Mediation and Translation": ["First Year", "Second Year", "Third Year"],
                "Cultural Studies and Anthropology": ["First Year", "Second Year", "Third Year"],
                "Language and Interculturality": ["First Year", "Second Year", "Third Year"],
                "Management of Cultural Assets and Archives": ["First Year", "Second Year", "Third Year"],
                "History of Europe and the Mediterranean": ["First Year", "Second Year", "Third Year"],
                "Management": ["First Year", "Second Year", "Third Year"],
                "Economics and Finances": ["First Year", "Second Year", "Third Year"],
                "Management of Sustainable Development": ["First Year", "Second Year", "Third Year"],
                "Law for Management": ["First Year", "Second Year", "Third Year"],
                "Political Science - International Relations and Economic Diplomacy": ["First Year", "Second Year", "Third Year"],
                "Tourism Destination Management": ["First Year", "Second Year", "Third Year"],
                "Tourism Enterprise Management": ["First Year", "Second Year", "Third Year"],
                "Tourism": ["First Year", "Second Year", "Third Year"],
                "Heritage Tourism": ["First Year", "Second Year", "Third Year"],
                "Innovative Tourism": ["First Year", "Second Year", "Third Year"],
                "Kinesiology": ["First Year", "Second Year", "Third Year"],
                "Nutritional Counselling - Dietetics": ["First Year", "Second Year", "Third Year"],
                "Physiotherapy": ["First Year", "Second Year", "Third Year"],
                "Nursing": ["First Year", "Second Year", "Third Year"],
                "Dietetics and Clinical Nutrition": ["First Year", "Second Year", "Third Year"],
                "Physical Education": ["First Year", "Second Year", "Third Year"],
                "Prevention for Health": ["First Year", "Second Year", "Third Year"],
                "Pedagogy": ["First Year", "Second Year", "Third Year"],
                "Pre-school Teaching": ["First Year", "Second Year", "Third Year"],
                "Primary School Teaching": ["First Year", "Second Year", "Third Year", "Fourth Year"],
                "Social Pedagogy": ["First Year", "Second Year", "Third Year"],
                "Visual Arts and Design": ["First Year", "Second Year", "Third Year"],
                "Andragogy": ["First Year", "Second Year", "Third Year"],
                "Inclusive Pedagogics": ["First Year", "Second Year", "Third Year"],
                "Early Learning": ["First Year", "Second Year", "Third Year"],
                "Education Sciences": ["First Year", "Second Year", "Third Year"],
                "Early Learning and Teaching": ["First Year", "Second Year", "Third Year"]
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
        const { selectedCategory, selectedSubcategory, selectedDeeperSubcategory, subcategories, deeperSubcategories } = this.state;

        return (
            <div style={{ textAlign: "center" }}>
                {!selectedCategory ? (
                    <>
                        <h1>Explore the library</h1>
                        <p>Choose which Faculty library you would like to explore</p>
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
                            {subcategories[selectedCategory][selectedSubcategory].map((subcategory, index) => (
                                <div key={index} style={{ margin: "10px 5px", width: "calc(100% / 3 - 20px)" }}>
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
                                        onClick={() => this.handleDeeperSubcategoryClick(subcategory)}
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
                ) : (
                    <>
                        <h3>Deeper Subcategories of {selectedDeeperSubcategory} in {selectedSubcategory} of {selectedCategory}:</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {deeperSubcategories[selectedDeeperSubcategory].map((subcategory, index) => (
                                <div key={index} style={{ margin: "10px 5px", width: "calc(100% / 3 - 20px)" }}>
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
                                        onClick={() => console.log(`Selected: ${subcategory}`)}
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
                )}
            </div>
        );
    }
}

export default Category;