const getHeightPerOrg = orgName => {
    switch(orgName) {
        case "Target":
            return "534px";
        case "RTX":
            return "440px";
        default:
            return "400px";
    }
};

export default getHeightPerOrg;