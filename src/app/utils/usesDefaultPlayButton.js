const usesDefaultPlayButton = orgName => {
  const customPlayOrgs = ["Target", "RTX"];
  return !customPlayOrgs.includes(orgName);
};

export default usesDefaultPlayButton;