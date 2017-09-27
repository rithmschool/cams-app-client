import React, { Component } from "react";
import { BASE_URL, config } from "./helpers.js";
import PropTypes from "prop-types";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: ""
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAdd(e) {
    e.preventDefault();
    this.setState({ question: "" });
    this.props.addQuestion(this.state.question);
  }

  render() {
    return (
      <div className="questions-form">
        <h4>Add Questions</h4>
        <form className="addQuestion" onSubmit={this.handleAdd.bind(this)}>
          <input
            type="text"
            onChange={this.handleChange.bind(this)}
            name="question"
            placeholder="Add A Question"
            value={this.state.question}
          />
          <button type="submit" className="button" value="Add">
            +
          </button>
        </form>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired
};

export default QuestionForm;
