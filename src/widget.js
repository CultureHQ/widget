const React = require("react");
const ReactDOM = require("react-dom");

const App = require("./app/App").default;

// This is purposefully `module.exports`, because if you use `export default`
// you end up having to use `CHQ.default` instead of just `CHQ`.
module.exports = (selector, token, filters, triggerHref) => {
  ReactDOM.render(
    <App token={token} filters={filters} triggerHref={triggerHref} />,
    document.querySelector(selector)
  );
};
