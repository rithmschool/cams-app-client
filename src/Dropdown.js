import React from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

const Assessment = ({ title, content, onChange }) => {
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

export default Assessment;
