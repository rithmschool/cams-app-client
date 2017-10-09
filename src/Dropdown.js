import React from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

const Dropdown = ({ title, content, onChange }) => {
  let contents = content.map((v, i) => (
    <div key={i}>
      <a
        className={v.selected ? "Selected" : ""}
        onClick={e => {
          onChange(v.value);
        }}
      >
        {v.name}
      </a>
    </div>
  ));
  return (
    <div className="dropdowntitle">
      <a id="title">{title}</a>
      <div className="dropdowncontent absolute">{contents}</div>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.isRequired,
      selected: PropTypes.bool.isRequired
    })
  ),
  onChange: PropTypes.func
};

export default Dropdown;
