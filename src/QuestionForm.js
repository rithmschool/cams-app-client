import React, { Component } from "react";
import { BASE_URL, config } from "./helpers.js";
import PropTypes from "prop-types";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      timer: 30
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
    this.setState({ question: "", timer: 30 });
    this.props.addQuestion({
      question: this.state.question,
      timer: this.state.timer ? this.state.timer : 30
    });
  }

  render() {
    return (
      <div className="questions-form">
        <h4>Add Questions</h4>
        <form className="addQuestion" onSubmit={this.handleAdd}>
          <input
            type="text"
            onChange={this.handleChange}
            name="question"
            placeholder="Add A Question"
            value={this.state.question}
          />
          <label htmlFor="timer">Timer (in secs)</label>
          <input
            type="number"
            onChange={this.handleChange}
            name="timer"
            value={this.state.timer}
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
