import React, { Component } from "react";
import PropTypes from "prop-types";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
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
    this.props.addQuestion({
      title: this.state.title,
      timer: this.state.timer || 30
    });
    this.setState({ title: "", timer: 30 });
  }

  render() {
    return (
      <div className="forms">
        <form className="addQuestion" onSubmit={this.handleAdd}>
          <h4>Add Question</h4>
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Add A Question"
            value={this.state.title}
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
