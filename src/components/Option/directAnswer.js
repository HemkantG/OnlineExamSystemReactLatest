import MatButton from "@material-ui/core/Button";
import React, { Component } from "react";
import Input from "@material-ui/core/Input";

class DirectAnswer extends Component {
    state = {
        answer: ""
    };

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    };
    render() {
        return (
            <div className="option row" style={{ padding: "15px" }}>
                <Input
                    className="col-md-8"
                    type="text"
                    name="answer"
                    placeholder="Enter your answer here and press submit!"
                    value={this.state.answer}
                    onChange={this.handleChange}
                />
                <MatButton
                    onClick={() => this.props.onDirectAnswerSubmit(this.state.answer)}
                    variant="raised"
                    className="btn-success mr-10 mb-10 text-white btn-icon">
                    <i className="zmdi zmdi-check-all" /> Submit
        </MatButton>
            </div>
        );
    }
}
export default DirectAnswer;
