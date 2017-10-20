import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MultipleChoiceQuestionForm.css";

class MultipleChoiceQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      choices: []
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAdd(e) {
    e.preventDefault();
    if (this.state.choices.length === 0) return;
    this.props.addQuestion({
      title: this.state.title,
      choices: this.state.choices
    });
    this.setState({ title: "", choices: [] });
  }

  handleClick() {
    this.setState({ choices: [...this.state.choices, ""] });
  }

  handleRemove(i) {
    let choices = this.state.choices.filter((e, index) => index !== i);
    this.setState({ choices });
  }

  handleChoiceChange(e) {
    let choices = [...this.state.choices];
    choices[e.target.name] = e.target.value;
    this.setState({ choices });
  }

  render() {
    let inputs = this.state.choices.map((e, i) => (
      <span className="bob" key={"span" + i}>
        <input
          type="text"
          name={i}
          placeholder="answer"
          key={i}
          value={this.state.choices[i]}
          onChange={this.handleChoiceChange}
          required
        />
        <button key={"butt-" + i} onClick={() => this.handleRemove(i)}>
          X
        </button>
      </span>
    ));
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
            required
          />
          <button className="button" type="button" onClick={this.handleClick}>
            Add choice
          </button>
          {inputs}
          <button type="submit" className="button" value="Add">
            +
          </button>
        </form>
      </div>
    );
  }
}

MultipleChoiceQuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired
};

export default MultipleChoiceQuestionForm;
