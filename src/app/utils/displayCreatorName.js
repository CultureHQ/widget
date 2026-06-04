import isRTX from "./isRTX";
import justFirstName from "./justFirstName";

const displayCreatorName = (creator, orgName) => {
  if (justFirstName(orgName)) return creator.firstName;
  if (isRTX(orgName)) return `${creator.firstName} ${creator?.lastName ? creator.lastName.toUpperCase()[0] : ''} `;

  return creator.name;
};

export default displayCreatorName;