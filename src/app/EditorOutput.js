import React from "react";

import BlockGroup from "./output/BlockGroup";
import getBlockGroups from "./output/getBlockGroups";

import { font } from "../styles.json";

const tagsContainer = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  marginTop: "10px",
  overflow: "hidden"
};

const tag = {
  color: "#fff",
  fontFamily: font,
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "22.8571px",
  marginLeft: "5px",
  marginTop: "0",
  padding: "0"
};

const darkTag = {
  ...tag,
  color: "#2c3e4f"
};

const badge = {
  alignItems: "center",
  display: "flex",
  marginRight: "10px"
};

const darkBadge = {
  ...badge,
  backgroundColor: "#f3f3f3",
  border: "0",
  borderRadius: "6px",
  color: "#2c3e4f",
  fontSize: "16px",
  fontWeight: "500",
  margin: "4px 5px 4px 0",
  padding: "5px 12px",
  textAlign: "left",
  outline: "none",
  textDecoration: "none",
  transition: "border-color .3s"
};

export const SEGMENTED_VALUE = "SEGMENTED";
export const MENTION_VALUE = "MENTION";

const tagsTypes = {
  CONNECTION: "connection",
  ALL_ORGANIZATION: "all company",
  DEPARTMENTS: "departments",
  DEPARTMENT: "department",
  COMPANIES: "companies",
  COMPANY: "company",
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
  output,
  showTags = true,
  showDefaultTag = false,
  tabIndex = 0,
  hideBody = false,
  darkTags = false
}) => {
  const { type, blocks, entityMap } = parseOutput(output);

  const getIconPath = ({ data }) => {
    switch (data.type) {
      case tagsTypes.INTERESTS:
        return "M699 128c-73 0-141 33-187 88C466 161 398 128 325 128 196 128 96 228 96 358c0 159 141 287 356 483L512 896l60-54C787 645 928 517 928 358 928 228 828 128 699 128z m-162 659-8 8-17 16-17-16-8-8c-101-93-188-173-245-244-56-69-81-126-81-184 0-46 17-88 47-119 30-31 72-48 117-48 52 0 104 24 138 65l49 58 49-58c34-41 86-65 138-65 45 0 87 17 117 48 31 31 47 73 47 119 0 58-25 115-81 184-58 71-145 151-246 244z";
      case tagsTypes.LOCATIONS:
        return "M512 0C313 0 152 161 152 360c0 67 19 133 54 189l286 461c5 9 15 14 25 14 0 0 0 0 0 0 10 0 20-6 26-15L821 544C854 489 872 425 872 360 872 161 711 0 512 0z M770 514 517 936l-260-419C227 470 212 416 212 360c0-165 135-300 300-300S812 195 812 360C812 414 797 467 770 514z M512 180c-99 0-180 81-180 180 0 99 79 180 180 180 102 0 180-82 180-180C692 261 611 180 512 180z M512 480c-67 0-120-54-120-120 0-66 54-120 120-120s120 54 120 120C632 425 580 480 512 480z";
      case tagsTypes.DEPARTMENTS:
        return "M437,268.152h-50.118c-6.821,0-13.425,0.932-19.71,2.646c-12.398-24.372-37.71-41.118-66.877-41.118h-88.59c-29.167,0-54.479,16.746-66.877,41.118c-6.285-1.714-12.889-2.646-19.71-2.646H75c-41.355,0-75,33.645-75,75v80.118c0,24.813,20.187,45,45,45h422c24.813,0,45-20.187,45-45v-80.118C512,301.797,478.355,268.152,437,268.152z M136.705,304.682v133.589H45c-8.271,0-15-6.729-15-15v-80.118c0-24.813,20.187-45,45-45h50.118c4.072,0,8.015,0.553,11.769,1.572C136.779,301.366,136.705,303.016,136.705,304.682z M345.295,438.271h-178.59V304.681c0-24.813,20.187-45,45-45h88.59c24.813,0,45,20.187,45,45V438.271z M482,423.271c0,8.271-6.729,15-15,15h-91.705v-133.59c0-1.667-0.074-3.317-0.182-4.957c3.754-1.018,7.697-1.572,11.769-1.572H437c24.813,0,45,20.187,45,45V423.271z M100.06,126.504c-36.749,0-66.646,29.897-66.646,66.646c-0.001,36.749,29.897,66.646,66.646,66.646c36.748,0,66.646-29.897,66.646-66.646C166.706,156.401,136.809,126.504,100.06,126.504z M100.059,229.796c-20.207,0-36.646-16.439-36.646-36.646c0-20.207,16.439-36.646,36.646-36.646c20.207,0,36.646,16.439,36.646,36.646C136.705,213.357,120.266,229.796,100.059,229.796z M256,43.729c-49.096,0-89.038,39.942-89.038,89.038c0,49.096,39.942,89.038,89.038,89.038s89.038-39.942,89.038-89.038C345.038,83.672,305.096,43.729,256,43.729z M256,191.805c-32.554,0-59.038-26.484-59.038-59.038c0-32.553,26.484-59.038,59.038-59.038s59.038,26.484,59.038,59.038C315.038,165.321,288.554,191.805,256,191.805z M411.94,126.504c-36.748,0-66.646,29.897-66.646,66.646c0.001,36.749,29.898,66.646,66.646,66.646c36.749,0,66.646-29.897,66.646-66.646C478.586,156.401,448.689,126.504,411.94,126.504z M411.94,229.796c-20.206,0-36.646-16.439-36.646-36.646c0.001-20.207,16.44-36.646,36.646-36.646c20.207,0,36.646,16.439,36.646,36.646C448.586,213.357,432.147,229.796,411.94,229.796z";
      case tagsTypes.SKILLS:
        return "m491.319 393.772-171.742-149.437 43.058-46.923 17.6 17.6 15.217-15.217 35.622 52.907 80.926-80.927-51.214-37.314 15.641-15.642-83.674-83.673c-30.815-30.814-80.953-30.812-111.765 0l-27.123 27.123 21.17 21.17 11.486-11.486c5.939-5.94 15.604-5.94 21.545 0 6.084 6.083 6.387 16.455.648 22.194l-24.673 24.673 19.469 19.47-51.777 47.176-63.436-55.156c9.119-31.97.412-66.477-23.535-90.424-26.439-26.442-65.866-34.313-100.442-20.052l-20.747 8.556 52.816 52.815c5.73 5.729 5.73 15.053 0 20.782-8.528 8.528-16.503 4.279-20.782 0l-52.816-52.815-8.556 20.746c-14.29 34.653-6.367 74.131 20.185 100.577 17.587 17.516 41.326 26.703 65.291 26.701 11.215-.001 22.486-2.014 33.188-6.127l52.62 54.729-166.3 151.524c-12.017 10.98-18.837 25.99-19.204 42.263-.367 16.274 5.77 31.575 17.28 43.084 11.185 11.185 25.948 17.296 41.707 17.296.459 0 .919-.005 1.379-.015 16.274-.367 31.283-7.188 42.241-19.181l150.805-164.344 156.279 162.54c11.229 11.784 26.379 18.286 42.657 18.312h.093c16.242 0 31.376-6.457 42.62-18.184 11.265-11.75 17.079-27.177 16.37-43.439-.71-16.264-7.845-31.126-20.127-41.882zm-258.273-150.775 24.568 24.582-46.052 50.186-28.872-28.886zm138.538-186.681 62.504 62.503-19.226 19.225 51.214 37.314-30.468 30.47-35.622-52.907-19.75 19.75-53.853-53.852 3.503-3.503c8.576-8.576 13.159-20.144 12.905-32.573-.249-12.119-5.061-23.469-13.552-31.962-2.444-2.443-5.101-4.548-7.911-6.313 17.08-5.67 36.686-1.722 50.256 11.848zm-30.139 119.907-63.57 69.276-22.675-22.688 69.504-63.329zm-202.196-21.749-10.012 5.396c-24.091 12.985-54.392 8.63-73.688-10.589-11.832-11.785-18.188-27.402-18.373-43.386l17.261 17.261c17.402 17.404 45.72 17.404 63.122 0 8.431-8.43 13.074-19.639 13.074-31.561s-4.643-23.131-13.074-31.561l-17.258-17.258c15.942.187 31.523 6.51 43.292 18.28 17.953 17.954 23.225 44.698 13.429 68.134l-4.169 9.975 76.601 66.601-21.796 19.859zm-58.709 306.075c-5.412 5.925-12.811 9.287-20.834 9.468-8.014.169-15.566-2.844-21.24-8.519-5.674-5.674-8.699-13.216-8.518-21.239s3.543-15.422 9.452-20.821l121.137-110.374 30.765 30.781zm392.923-2.178c-5.542 5.782-13.002 8.964-21.009 8.964-.015 0-.031 0-.046 0-8.024-.013-15.492-3.218-21.075-9.075l-157.624-163.939 25.618-27.918 172.303 149.924c6.037 5.287 9.554 12.614 9.904 20.63.349 8.017-2.516 15.621-8.071 21.414z";
      case tagsTypes.MAJORS:
        return "ios-star-outline";
      case tagsTypes.RESIDENTS:
        return "home-outlined";
      case tagsTypes.COURSES:
        return "book";
      case tagsTypes.CLASS_YEARS:
        return "mortarboard";
      case tagsTypes.ORG_VALUES:
        return "M510.025,139.609l-85.333-102.4c-1.621-1.937-4.019-3.063-6.554-3.063H93.871c-2.534,0-4.932,1.118-6.554,3.063 l-85.333,102.4c-2.125,2.543-2.586,6.084-1.178,9.079c1.408,2.995,4.42,4.915,7.731,4.915h494.933c3.311,0,6.323-1.92,7.731-4.915 C512.602,145.702,512.15,142.16,510.025,139.609z M26.757,136.537l71.108-85.333h316.271l71.108,85.333H26.757z M263.898,39.402c-1.323-3.191-4.437-5.265-7.885-5.265H93.88c-3.055,0-5.871,1.63-7.398,4.284s-1.519,5.905,0.026,8.55 l59.733,102.4c1.331,2.278,3.644,3.823,6.272,4.164c0.367,0.043,0.734,0.068,1.092,0.068c2.253,0,4.429-0.887,6.042-2.5 l102.4-102.4C264.487,46.263,265.221,42.593,263.898,39.402z M155.397,131.212l-46.669-80.008h126.677L155.397,131.212z M511.109,141.281c-1.434-2.91-4.403-4.753-7.646-4.753H8.53c-3.243,0-6.204,1.843-7.646,4.753 c-1.434,2.91-1.101,6.383,0.87,8.96l247.467,324.267c1.613,2.116,4.122,3.362,6.784,3.362s5.171-1.246,6.767-3.362 l247.467-324.267C512.21,147.664,512.542,144.191,511.109,141.281z M256.005,455.274L25.784,153.604h460.442L256.005,455.274z M264.146,466.76l-102.4-324.267c-1.126-3.55-4.412-5.965-8.141-5.965H8.538c-3.243,0-6.204,1.843-7.646,4.753 c-1.434,2.91-1.101,6.383,0.87,8.96l247.467,324.267c1.655,2.176,4.19,3.362,6.784,3.362c1.331,0,2.679-0.307,3.925-0.973 C263.617,474.995,265.391,470.711,264.146,466.76z M25.784,153.604H147.35l85.811,271.736L25.784,153.604z M425.537,38.421c-1.519-2.654-4.343-4.284-7.398-4.284H256.005c-3.447,0-6.562,2.074-7.885,5.265 c-1.323,3.191-0.589,6.861,1.852,9.301l102.4,102.4c1.604,1.613,3.78,2.5,6.033,2.5c0.367,0,0.734-0.026,1.101-0.068 c2.62-0.341,4.941-1.877,6.272-4.164l59.733-102.4C427.047,44.326,427.056,41.075,425.537,38.421z M356.613,131.212 l-80.009-80.008h126.677L356.613,131.212z M511.126,141.299c-1.434-2.91-4.403-4.753-7.646-4.753H358.413c-3.729,0-7.023,2.415-8.141,5.965l-102.4,324.267 c-1.246,3.942,0.529,8.226,4.207,10.138c1.246,0.648,2.594,0.956,3.925,0.956c2.586,0,5.12-1.186,6.784-3.345l247.467-324.267 C512.227,147.681,512.559,144.208,511.126,141.299z M278.849,425.339l85.811-271.736h121.566L278.849,425.339z";
      default:
        return "";
    }
  };

  const getIconViewbox = ({ data }) => {
    switch (data.type) {
      case tagsTypes.INTERESTS:
      case tagsTypes.LOCATIONS:
        return "0 0 1024 1024";
      default:
        return "0 0 512 512";
    }
  };

  const tags = entityMap && Object.values(entityMap).filter(
    entity => entity.type === MENTION_VALUE
      && entity.mutability === SEGMENTED_VALUE
      && entity.data.type
      && entity.data.type !== "organizations"
  );

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
              entity.type === MENTION_VALUE
              && entity.mutability === SEGMENTED_VALUE
              && entity.data.type ? (
                <span
                  style={darkTags ? darkBadge : badge}
                  key={`${entity.data.type}-${entity.data.entityId}`}
                >
                  <svg
                    aria-hidden="true"
                    role="presentation"
                    width="15px"
                    height="15px"
                    viewBox={getIconViewbox(entity)}
                  >
                    <path
                      transform="translate(0 0)"
                      d={getIconPath(entity)}
                      fill={darkTags ? "#2c3e4f" : "#FFFFFF"}
                    />
                  </svg>
                  <span style={darkTags ? darkTag : tag}>
                    {entity.data.name}
                  </span>
                </span>
              ) : <div key={index} /> // eslint-disable-line react/no-array-index-key
            ))}
            {showDefaultTag && showTags && tags && Object.values(tags).length === 0 && (
              <span style={darkTags ? darkBadge : badge}>
                <svg
                  aria-hidden="true"
                  role="presentation"
                  width="15px"
                  height="15px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill={darkTags ? "#2c3e4f" : "#FFFFFF"}
                    transform="translate(0 0)"
                    d="M256,0C115.04,0,0,115.049,0,256c0,68.113,26.702,132.327,75.188,180.812C123.674,485.297,187.887,512,256,512c140.96,0,256-115.049,256-256C512,115.04,396.951,0,256,0z M256,30c24.848,0,48.766,4.042,71.147,11.484c-4.226,6.435-6.519,14.599-6.519,24.163c0,16.203,7.242,30.686,14.245,44.693c5.697,11.394,11.078,22.156,11.078,31.277c0,5.492-1.474,6.95-5.903,8.543c-8.447,3.038-23.782,2.803-33.67,2.772c-24.737-0.082-52.752-0.172-82.649,29.725c-4.131,4.131-6.367,4.342-20.67-2.81c-13.088-6.544-34.994-17.497-55.3,2.81c-11.877,11.877-16.567,28.603-13.284,45.566c-5.555-2.157-11.205-3.705-16.71-5.214c-8.949-2.452-19.092-5.231-20.744-9.421c-1.148-2.913-2.943-15.593,22.206-56.423c9.52-15.455,20.968-38.081,10.515-56.052c-4.917-8.453-13.124-13.031-22.092-15.463C147.374,51.01,199.278,30,256,30z M256,482C131.383,482,30,380.617,30,256c0-54.16,19.157-103.925,51.042-142.893c17.436-0.17,21.735,2.171,22.745,3.104c0.17,0.892,0.851,7.437-10.104,25.22c-24.516,39.8-31.863,64.671-24.571,83.162c7.158,18.15,25.77,23.25,40.725,27.348c6.198,1.698,12.053,3.303,16.832,5.546c26.651,12.508,43.242,20.877,53.797,27.136c10.451,6.198,12.997,9.227,13.546,10.042v25.212c0,18.795,17.746,28.946,32.006,37.102c5.776,3.305,17.798,10.181,18.641,13.544c0,59.843,5.788,92.781,13.246,111.45C257.269,481.981,256.637,482,256,482z M295.019,465.781c0.095,3.062-2.858,9.297-5.622,11.99c-3.788-5.117-14.739-26.875-14.739-107.245c0-20.282-18.711-30.985-33.745-39.585c-5.292-3.027-15.099-8.58-17.001-11.642v-24.743c0-4.041-0.652-7.646-1.948-10.889c24.929-2.291,37.073-11.073,46.283-17.733c6.468-4.677,9.714-7.024,16.734-7.024c0.202,0,0.307,0.015,0.303,0.012c1.577,0.772,4.93,6.378,6.935,9.729c1.671,2.792,3.563,5.956,5.753,9.119c19.059,27.533,43.925,32.979,60.379,36.583c4.361,0.955,10.846,2.375,12.771,3.657c0.065,0.306,0.152,0.896,0.152,1.868c0,30.97-23.736,53.397-44.679,73.184c-16.79,15.864-31.583,29.564-31.583,46.932l-0.002,1.677C294.988,464.758,295.005,465.325,295.019,465.781z M324.865,471.259c0.334-2.137,0.199-4.245,0.144-6.284c-0.009-0.809-0.016-5.567,0.002-23.274l0.002-1.703c0.001-0.021,0.404-2.172,4.92-7.669c4.217-5.131,10.556-11.12,17.266-17.46c22.821-21.562,54.076-51.092,54.076-94.99c0-15.037-7.585-23.037-13.948-27.1c-6.652-4.248-14.378-5.94-22.557-7.731c-14.646-3.208-29.79-6.525-42.131-24.353c-1.622-2.343-3.104-4.821-4.674-7.444c-6.145-10.273-14.561-24.342-32.983-24.342c-16.731,0-26.479,7.05-34.313,12.714c-8.967,6.485-17.438,12.609-41.656,12.609c-24.056,0-38.364-13.938-43.308-25.873c-1.869-4.512-5.292-15.93,3.268-24.49c4.132-4.131,6.367-4.342,20.67,2.81c13.088,6.544,34.994,17.497,55.3-2.81c21.07-21.07,38.85-21.01,61.338-20.939c14.308,0.047,30.752,0.195,43.922-4.542c16.604-5.972,25.75-19.032,25.75-36.773c0-16.203-7.242-30.686-14.245-44.693c-5.697-11.394-11.078-22.156-11.078-31.277c0-7.422,1.389-10.092,9.274-10.303C432.378,93.025,482,168.823,482,256C482,356.612,415.908,442.065,324.865,471.259z"
                  />
                </svg>
                <span style={darkTags ? darkTag : tag}>Everyone</span>
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
