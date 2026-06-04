import isProgressive from "./isProgressive";
import isTarget from "./isTarget";

const justFirstName = orgName => (
  isTarget(orgName) || isProgressive(orgName)
);

export default justFirstName;
