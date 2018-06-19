import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

// This is purposefully `module.exports`, because if you use `export default`
// you end up having to use `CHQ.default` instead of just `CHQ`.
module.exports = (selector, token) => {
  ReactDOM.render(<App token={token} />, document.querySelector(selector));
};
