import React from "react";

class Category extends React.Component {
    render() {
        return (
            <div className="card" style={{ margin: "10px" }}>
                <div className="card-body">
                    <h5 className="card-title">Choose books category</h5>
                    <p className="card-text"></p>
                </div>
            </div>
        );
    }
}

export default Category;