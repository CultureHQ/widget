import React from "react";

import { Icon } from "@culturehq/components";
import BlockGroup from "./output/BlockGroup";
import getBlockGroups from "./output/getBlockGroups";

const tagsContainer = {
  "alignItems": "center",
  "display": "flex"
}

const tag = {
  "color": "#fff",
  "fontSize": "18px",
  "fontWeight": "300",
  "marginLeft": "5px",
  "marginTop": "0",
  "padding": "0"
};

const badge = {
  "alignItems": "center",
  "display": "flex",
  "marginRight": "10px"
};

export const SEGMENTED_VALUE = "SEGMENTED";
export const MENTION_VALUE = "MENTION";

const tagsTypes = {
  CONNECTION: "connection",
  COMPANY: "all company",
  DEPARTMENTS: "departments",
  DEPARTMENT: "department",
  INTERESTS: "interests",
  INTEREST: "interest",
  LOCATIONS: "locations",
  LOCATION: "location",
  SKILLS: "skills",
  SKILL: "skill",
  CLASS_YEARS: "class years",
  CLASS_YEAR: "class_year",
  CLASS_YEAR_TYPE: "classyear",
  COURSES: "courses",
  COURSE: "course",
  MAJORS: "majors",
  MAJOR: "major",
  RESIDENTS: "residents",
  RESIDENT: "resident",
  USERS: "users",
  USER: "user",
  ORG_VALUES: "organization values",
  ORG_VALUE: "organization_value",
  ORG_VALUE_TYPE: "organizationvalue"
};

const parseOutput = output => {
  if (!output) {
    return { type: "null" };
  }

  try {
    return { type: "json", ...JSON.parse(output) };
  } catch (error) {
    return { type: "text" };
  }
};

const EditorOutput = ({
  output, showTags = true, showDefaultTag = false, tabIndex = 0, hideBody = false
}) => {
  const { type, blocks, entityMap } = parseOutput(output);

  const getIcon = ({ data }) => {
    switch (data.type) {
      case tagsTypes.INTERESTS:
        return "heart-ol";
      case tagsTypes.LOCATIONS:
        return "loc-ol";
      case tagsTypes.DEPARTMENTS:
        return "ios-people-outline";
      case tagsTypes.SKILLS:
        return "hammer";
      case tagsTypes.MAJORS:
        return "ios-star-outline";
      case tagsTypes.RESIDENTS:
        return "home-outlined";
      case tagsTypes.COURSES:
        return "book";
      case tagsTypes.CLASS_YEARS:
        return "mortarboard";
      case tagsTypes.ORG_VALUES:
        return "diamond";
      default:
        return "";
    }
  };

  const tags = entityMap && Object.values(entityMap).filter(entity => entity.type === MENTION_VALUE && entity.mutability === SEGMENTED_VALUE && entity.data.type && entity.data.type !== "organizations");

  switch (type) {
    case "json":
      return (
        <div className="chq-edi-op">
          {!hideBody && getBlockGroups(blocks).map(blockGroup => (
            <BlockGroup
              key={blockGroup.key}
              blockGroup={blockGroup}
              entityMap={entityMap}
              tabIndex={tabIndex}
            />
          ))}
          <div className="chq-ffd-tags" style={tagsContainer}>
            {showTags && tags && Object.values(tags).map((entity, index) => (
              (entity.type === MENTION_VALUE && entity.mutability === SEGMENTED_VALUE
                && entity.data.type)
                ? (
                  <span style={badge} key={`${entity.data.type}-${entity.data.entityId}`}>
                    <Icon icon={getIcon(entity)} color="#FFFFFF" />
                    <span style={tag}>{entity.data.name}</span>
                  </span>
                )
                : (<div key={index} />)
            ))}
            {showDefaultTag && showTags && tags && Object.values(tags).length === 0 && (
              <span style={badge}>
                <Icon icon="global" color="#FFFFFF" />
                <span style={tag}>Everyone</span>
                </span>
            )}
          </div>
        </div>
      );
    case "text":
      return <div className="chq-edi-op">{output}</div>;
    default:
      return null;
  }
};

export default EditorOutput;