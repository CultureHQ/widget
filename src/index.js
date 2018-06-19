import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

module.exports = (selector, token) => {
  ReactDOM.render(<App token={token} />, document.querySelector(selector));
};
