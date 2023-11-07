import imagesSizes from "./imagesSizes";

export const getImageFromStory = (size, story) => {
  switch (size) {
    case imagesSizes.THUMB:
      return story?.media?.thumbnail || story?.media?.url;
    case imagesSizes.SMALL:
      return story?.media?.smallUrl || story?.media?.url;
    case imagesSizes.NORMAL:
      return story?.media?.url;
    case imagesSizes.FULL:
      return story?.media?.fullUrl || story?.media?.url;
    default:
      return "";
  }
};

export default getImageFromStory;
