import React from "react";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: null,
            selectedSubcategory: null,
            subcategories: {
                "UP FAMNIT": {
                    "Bachelor degree": ["Agronomy", "Bioinformatics", "Biopsychology", "Mathematics",
                        "Mathematics in Economics and Finance", "Computer Science", "Conservation Biology"],
                    "Master degree": ["Biopsychology", "Mathematical Sciences", "Matematics with Finanical Engineering",
                        "Data Science", "Psychology", "Computer Science", "Sustainable Built Enviroments",
                        "Nature Conservation"],
                    "Doctoral (PhD) degree": ["Mathematical Sciences", "Renewable Materials from Healthy Built Enviroments",
                        "Computer Science", "Suicidology and Mental Health", "Conservation Biology"]
                },
                "UP FHŠ": {
                    "Bachelor degree": ["Geography", "Italian Studies", "Communication and the Media", "Cultural Heritage",
                        "Intercultural Linguistic Mediation", "Slovene Studies", "History", "Anthropology", "Archaeology"],
                    "Master degree": ["Archaeological Heritage of the Mediterranean", "Geography", "Italian Studies",
                        "Linguistic Mediation and Translation", "Communication and the Media", "Cultural Studies and Antropology",
                        "History", "Slovene Studies"],
                    "Doctoral (PhD) degree": ["Anthropology", "Archaeology", "Geography", "Language and Interculturality",
                        "Slovene Studies", "Management of Cultural Assets and Archives", "History of Eurpe and the Mediterranean"]
                },
                "UP FM": {
                    "Bachelor degree": ["Management"],
                    "Master degree": ["Economics and Finances", "Management", "Management of Sustainable development",
                        "Law for management", "Political Science - international relations and econommic diplomacy"],
                    "Doctoral (PhD) degree": ["Management"]
                },
                "UP FTŠ": {
                    "Bachelor degree": ["Tourism Destination management", "Tourism Enterprise management"],
                    "Master degree": ["Tourism", "Heritage Tourism"],
                    "Doctoral (PhD) degree": ["Innovative Tourism"]
                },
                "UP FVZ": {
                    "Bachelor degree": ["Kinesiology", "Nutritional Counselling - Dietetics", "Physiotherapy", "Nursing"],
                    "Master degree": ["Kinesiology", "Dietetics and Clinical Nutrition", "Physiotherapy",
                        "Physcial Education", "Nursing"],
                    "Doctoral (PhD) degree": ["Prevention for Health"]
                },
                "UP PEF": {
                    "Bachelor degree": ["Pedagogy", "Pre-school Teaching", "Primary School Teaching", "Social Pedagogy", "Visual Arts and Design"],
                    "Master degree": ["Andragogy", "Inclusive pedagogics", "Primary School Teaching", "Social Pedagogy",
                        "Visual Arts and Design", "Early Learning"],
                    "Doctoral (PhD) degree": ["Education Sciences", "Early Learning and Teaching"]
                }
            }
        };
    }

    handleClick = (category) => {
        this.setState({ selectedCategory: category, selectedSubcategory: null });
    };

    handleSubcategoryClick = (subcategory) => {
        this.setState({ selectedSubcategory: subcategory });
    };

    handleBack = () => {
        const { selectedSubcategory } = this.state;
        if (selectedSubcategory) {
            this.setState({ selectedSubcategory: null });
        } else {
            this.setState({ selectedCategory: null });
        }
    };

    render() {
        const { selectedCategory, selectedSubcategory, subcategories } = this.state;

        return (
            <div style={{ textAlign: "center" }}>
                {!selectedCategory ? (
                    <>
                        <h1>Explore the library</h1>
                        <p>Choose which Faculty library you would like to explore</p>
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            {Object.keys(subcategories).map((category) => (
                                <div key={category} style={{ flex: "0 0 30%", margin: "10px" }}>
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: "100%", backgroundColor: "#003f5c", borderColor: "#003f5c" }}
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
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            {Object.keys(subcategories[selectedCategory]).map((subcategory) => (
                                <div key={subcategory} style={{ flex: "0 0 30%", margin: "10px" }}>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ width: "100%", backgroundColor: "#003f5c", borderColor: "#003f5c" }}
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
                                style={{ backgroundColor: "#003f5c", borderColor: "#003f5c" }}
                                onClick={this.handleBack}
                            >
                                ← Back
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3>Subcategories of {selectedSubcategory} in {selectedCategory}:</h3>
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                            {subcategories[selectedCategory][selectedSubcategory].map((subcategory, index) => (
                                <div key={index} style={{ flex: "0 0 30%", margin: "10px" }}>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ width: "100%", backgroundColor: "#003f5c", borderColor: "#003f5c" }}
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
                                style={{ backgroundColor: "#003f5c", borderColor: "#003f5c" }}
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