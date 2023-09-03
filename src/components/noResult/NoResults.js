// NoResults.js
import React from "react";
import './NoResults.css'

const NoResults = ({title, text}) => {
  return (
    <div className="no-results-container">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

export default NoResults;
