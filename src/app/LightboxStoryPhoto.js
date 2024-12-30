/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import imageFromStory from "./utils/getImageFromStory";
import imagesSizes from "./utils/imagesSizes";
import EditorOutput from "./EditorOutput";
import Loader from "./Loader";

import defaultStyles from "../styles.json";
import Subtitles from "./Subtitles";
import LightboxImageSlider from "./LightboxImageSlider";

const GalleryLightboxWrapper = styled.div`
  border-radius: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    border-radius: 6px;
    flex-direction: row;
  }
`;

const GalleryLightboxPhoto = styled.div`
  margin: 0 auto;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    float: left;
    height: 80vh;
    min-height: 1px;
    width: 58.33333333%;
  }
`;

const galleryLightboxVideoPlay = {
  alignItems: "center",
  bottom: "0",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  left: "0",
  position: "absolute",
  right: "0",
  top: "0",
  width: "100%",
  zIndex: "10"
};

const Video = styled.video`
  display: block;
  height: 100%;
  left: 0;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  position: relative;
  top: 0;
  -webkit-transform: initial;
  transform: initial;
  width: auto;

  @media (min-width: 768px) {
    height: 100%;
    left: 0;
    max-height: 100%;
    object-fit: contain;
    position: relative;
    top: 0;
    transform: initial;
  }
`;

const GalleryLightboxDetailsContainer = styled.div`
  background-color: #fff;
  border-radius: 0 6px 6px 0;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  justify-content: space-between;
  min-height: initial;
  padding: 20px;

  @media (min-width: 768px) {
    border-radius: 0 6px 6px 0;
    min-height: initial;
    width: 41.66666667%;
  }
`;

const ScrollableContainer = styled.div`
  height: 100%;

  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }

  @media (min-width: 768px) {
    max-height: 75vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 20px;
  }
`;

const GalleryLightboxTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const galleryLightboxParentTitleContainerStyles = {
  Target: `
    align-items: flex-start;
    flex-direction: column;
  `
};

const GalleryLightboxParentTitleContainer = styled.div`
  align-items: center;
  display: flex;

  ${props => galleryLightboxParentTitleContainerStyles[props.organizationName] || ``}
`;

const galleryLightboxSubtitleContainerStyles = {
  Target: `
    margin-left: 10px;
  `
};

const GalleryLightboxSubtitleContainer = styled.div`
  align-items: center;
  color: #888;
  display: flex;
  font-size: 18px;
  font-weight: 400;
  margin-left: 25px;
  margin-top: 5px;

  ${props => galleryLightboxSubtitleContainerStyles[props.organizationName] || ``}
`;

const SubArrow = styled.svg`
  margin-bottom: 10px;
  margin-right: 9px;
  transform: scaleX(-1);
`;

const organizationSubArrowPathStyles = {
  Target: `
    fill: #CC000066;
  `
};

const SubArrowPath = styled.path`
  ${props => organizationSubArrowPathStyles[props.organizationName] || `
    fill: rgba(140, 180, 214, 0.4);
  `}
`;

const organizationTitleStyles = {
  Target: `
    color: #333333;
    font-size: 24px;
    font-weight: 700;
    margin: 10px 0 0;
  `
};

const Title = styled.h1`
  line-height: 1.1;
  letter-spacing: 0;
  margin: 0 0 0 12px;
  -webkit-font-smoothing: initial;

  ${props => `font-family: ${defaultStyles[props.organizationName]?.font || defaultStyles.default.font};`}

  ${props => organizationTitleStyles[props.organizationName] || `
    color: #5c5f67;
    font-size: 20px;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 26px;
    }
  `}
`;

const GalleryLightBoxCreatorContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 15px;
  position: relative;
`;

const organizationGalleryLightboxUploaderDateStyles = {
  Target: `
    color: #333333;
    font-size: 18px;
    font-weight: 400;
  `
};

const GalleryLightboxUploaderDate = styled.div`
  line-height: 1.42857143;
  -webkit-font-smoothing: initial;

  ${props => `font-family: ${defaultStyles[props.organizationName]?.font || defaultStyles.default.font};`}
  ${props => organizationGalleryLightboxUploaderDateStyles[props.organizationName] || `
    color: #c9c9c9;
    font-size: 16px;
    font-weight: 200;

  `}
`;

const organizationQuoteIconStyles = {
  Target: `
    height: 35px;
    min-width: 35px;
    width: 35px;
    transform: none;

    path {
      fill: #CC0000;
    }
  `
};

const QuoteIconDiv = styled.svg`
  ${props => organizationQuoteIconStyles[props.organizationName] || `
    height: 42px;
    min-width: 42px;
    width: 42px;
    transform: scaleX(-1);
  `}
`;

const Hr = styled.hr`
  height: 0;
  box-sizing: content-box;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
`;

const Thumbnail = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 25px;
  display: inline-block;
  min-width: 45px;
  height: 45px;
  width: 45px;
`;

const organizationGalleryLightboxUploaderNameStyles = {
  Target: `
    color: #CC0000;
    font-size: 20px;
    font-weight: 700;
  `
};

const GalleryLightboxUploaderName = styled.span`
  line-height: 1.42857143;
  padding-bottom: 5px;

  ${props => `font-family: ${defaultStyles[props.organizationName]?.font || defaultStyles.default.font};`}
  ${props => organizationGalleryLightboxUploaderNameStyles[props.organizationName] || `
    color: #6a89af;
    font-size: 16px;
    font-weight: 600;
  `}
`;

const VideoPlaySvg = styled.svg`
  height: 80px;
  width: 80px;
`;

const GalleryLightboxImageContainer = styled.div`
  background-size: cover;
  filter: blur(2px);
  left: 50%;
  opacity: 0.3;
  position: absolute;
  top: 50%;
  transform: scale(11);
  width: 10%;

  @media (min-width: 768px) {
    height: 10%;
  }
`;

const BottomShadow = styled.div`
  background-image: linear-gradient(
    0deg,
    white 0%,
    rgba(255, 255, 255, 0) 100%
  );
  bottom: 0;
  display: none;
  height: 10%;
  margin-left: -20px;
  margin-right: -20px;
  position: absolute;
  width: 100%;

  @media screen and (min-width: 768px) {
    border-bottom-right-radius: 6px;
    display: block;
  }
`;

const organizationQuestionTextStyles = {
  Target: `
    color: #333333;
    font-size: 20px;
    font-weight: 700;
  `
};

const QuestionText = styled.span`
  font-family: ${props => defaultStyles[props.organizationName]?.font || defaultStyles.default.font};
  ${props => organizationQuestionTextStyles[props.organizationName] || `
    color: initial;
    font-size: 18px;
    font-weight: 400;
  `}
`;

const organizationPromptIconStyles = {
  Target: `
    background-color: #CC0000;
  `
};

const commonIconStyles = `
  align-items: center;
  border-radius: 80px;
  display: flex;
  height: 35px;
  justify-content: center;
  margin-right: 10px;
  min-width: 35px;
  width: 35px;
`;

const PromptIconAll = styled.div`
  ${commonIconStyles}
  ${props => organizationPromptIconStyles[props.organizationName] || `
    background: linear-gradient(90deg, #8cb4d6 0%, #ffd24b 100%);
  `}
`;

const PromptIconVideos = styled.div`
  ${commonIconStyles}
  ${props => organizationPromptIconStyles[props.organizationName] || `
    background: linear-gradient(90deg, #4e6d87 0%, #8cb4d6 100%);
  `}
`;

const PromptIconImages = styled.div`
  ${commonIconStyles}
  ${props => organizationPromptIconStyles[props.organizationName] || `
    background: linear-gradient(90deg, #aa8c30 0%, #ffd24b 100%);
  `}
`;

const Icon = styled.svg`
  height: 19px;
  min-width: 19px;
  width: 19px;
`;

const IconPath = styled.path`
  fill: #FFF;
`;

const TargetPlayContainer = styled.div`
  align-items: center;
  background-color: #CC0000;
  border-radius: 40px;
  color: #FFFFFF;
  display: flex;
  height: 54px;
  justify-content: center;
  width: 157px;
`;

const PlayIcon = ({ organizationName }) => {
  if (organizationName === "Target") {
    return (
      <TargetPlayContainer>
        <span style={{ fontWeight: "600", fontSize: "20px" }}>Play</span>
        <svg viewBox="0 0 30.065 30.065" style={{ height: "20px", marginLeft: "10px", width: "20px" }}>
          <g>
            <path style={{ fill: "#FFFFFF" }} d="M26.511,12.004L6.233,0.463c-2.151-1.228-4.344,0.115-4.344,2.53v24.093 c0,2.046,1.332,2.979,2.57,2.979c0.583,0,1.177-0.184,1.767-0.543l20.369-12.468c1.024-0.629,1.599-1.56,1.581-2.555 C28.159,13.503,27.553,12.593,26.511,12.004z M25.23,14.827L4.862,27.292c-0.137,0.084-0.245,0.126-0.319,0.147 c-0.02-0.074-0.04-0.188-0.04-0.353V2.994c0-0.248,0.045-0.373,0.045-0.404c0.08,0.005,0.22,0.046,0.396,0.146l20.275,11.541 c0.25,0.143,0.324,0.267,0.348,0.24C25.554,14.551,25.469,14.678,25.23,14.827z" />
          </g>
        </svg>
      </TargetPlayContainer>
    );
  }

  return (
    <VideoPlaySvg
      aria-hidden="true"
      role="presentation"
      width="22px"
      height="22px"
      viewBox="0 0 512 512"
    >
      <path
        fill="#FFFFFF"
        transform="translate(0 0)"
        d="M238.933,0C106.974,0,0,106.974,0,238.933s106.974,238.933,238.933,238.933s238.933-106.974,238.933-238.933 C477.726,107.033,370.834,0.141,238.933,0z M339.557,246.546c-1.654,3.318-4.343,6.008-7.662,7.662v0.085L195.362,322.56 c-8.432,4.213-18.682,0.794-22.896-7.638c-1.198-2.397-1.815-5.043-1.8-7.722V170.667c-0.004-9.426,7.633-17.07,17.059-17.075 c2.651-0.001,5.266,0.615,7.637,1.8l136.533,68.267C340.331,227.863,343.762,238.11,339.557,246.546z"
      />
    </VideoPlaySvg>
  );
};

const QuoteIcon = ({ organizationName }) => (
  <QuoteIconDiv
    ariaHidden="true"
    role="presentation"
    viewBox={organizationName === "Target" ? "0 0 771 624" : "0 0 1024 1024"}
    organizationName={organizationName}
  >
    {organizationName === "Target" ? (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path d="M745.594698,364.965586 C717.740894,325.161567 697.8148,306.136845 653.261576,293.292027 C641.077675,289.777315 615.755551,288.169417 577.295202,288.468335 C581.991204,250.627236 597.273279,219.021676 623.141427,193.651654 C636.925676,180.132839 657.470654,164.007838 684.359717,153.632019 C694.997905,149.527007 712.196591,145.145137 735.955774,140.486409 L735.955774,0 C687.480743,4.45423015 640.997455,20.67539 596.505912,48.6634795 C524.594442,93.9004948 463.944851,180.183619 442.621277,256.577123 C418.499956,342.989133 410.897293,454.356522 462.764099,539.049583 C493.665396,589.508165 539.772353,621.561282 602.204465,624 C602.461324,624 609.361854,624 609.626445,624 C684.359717,621.376997 748.68873,572.176959 766.071766,494.135636 C775.174779,453.26756 773.448503,404.769604 745.594698,364.965586 Z" />
          <path d="M321.594698,364.965586 C293.740894,325.161567 273.8148,306.136845 229.261576,293.292027 C217.077675,289.777315 191.755551,288.169417 153.295202,288.468335 C157.991204,250.627236 173.273279,219.021676 199.141427,193.651654 C212.925676,180.132839 233.470654,164.007838 260.359717,153.632019 C270.997905,149.527007 288.196591,145.145137 311.955774,140.486409 L311.955774,0 C263.480743,4.45423015 216.997455,20.67539 172.505912,48.6634795 C100.594442,93.9004948 39.9448513,180.183619 18.621277,256.577123 C-5.50004402,342.989133 -13.1027071,454.356522 38.7640986,539.049583 C69.665396,589.508165 115.772353,621.561282 178.204465,624 C178.461324,624 185.361854,624 185.626445,624 C260.359717,621.376997 324.68873,572.176959 342.071766,494.135636 C351.174779,453.26756 349.448503,404.769604 321.594698,364.965586 Z" />
        </g>
      </g>
    ) : (
      <path
        fill="#8cb4d6"
        transform="translate(0 0)"
        d="M925.036,57.197h-304c-27.6,0-50,22.4-50,50v304c0,27.601,22.4,50,50,50h145.5c-1.9,79.601-20.4,143.3-55.4,191.2 c-27.6,37.8-69.399,69.1-125.3,93.8c-25.7,11.3-36.8,41.7-24.8,67.101l36,76c11.6,24.399,40.3,35.1,65.1,24.399 c66.2-28.6,122.101-64.8,167.7-108.8c55.601-53.7,93.7-114.3,114.3-181.9c20.601-67.6,30.9-159.8,30.9-276.8v-239 C975.036,79.598,952.635,57.197,925.036,57.197z M106.036,913.497c65.4-28.5,121-64.699,166.9-108.6c56.1-53.7,94.4-114.1,115-181.2c20.6-67.1,30.899-159.6,30.899-277.5 v-239c0-27.6-22.399-50-50-50h-304c-27.6,0-50,22.4-50,50v304c0,27.601,22.4,50,50,50h145.5c-1.9,79.601-20.4,143.3-55.4,191.2 c-27.6,37.8-69.4,69.1-125.3,93.8c-25.7,11.3-36.8,41.7-24.8,67.101l35.9,75.8C52.336,913.497,81.236,924.298,106.036,913.497z"
      />
    )}
  </QuoteIconDiv>
);

const PromptIcon = ({ allowedTypes, organizationName }) => {
  const getIcon = () => {
    switch (allowedTypes) {
      case "just_images":
        return (
          <PromptIconImages  organizationName={organizationName}>
            <Icon aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
              <IconPath transform="translate(0 0)" d="M736 448c53 0 96-43 96-96s-43-96-96-96c-53 0-96 43-96 96s43 96 96 96z M904 128h-784c-31 0-56 25-56 57v655c0 31 25 57 56 57h784c31 0 56-25 56-57v-655c0-31-25-57-56-57z M698 523c-6-7-15-12-26-12-10 0-17 5-26 11l-37 32c-8 6-14 9-23 9-9 0-16-3-22-8-2-2-6-5-9-8l-108-116c-8-9-20-15-33-15s-26 7-34 16l-253 305v-521c2-14 13-23 26-23h715c14 0 25 10 26 24l1 521-198-213z" />
            </Icon>
          </PromptIconImages>
        );
      case "just_videos":
        return (
          <PromptIconVideos  organizationName={organizationName}>
            <Icon aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 468 468">
              <IconPath transform="translate(0 0)" d="M264.704,96.512H51.2c-28.16,0-51.2,23.04-51.2,51.2v172.544c0,28.16,23.04,51.2,51.2,51.2h213.504 c28.16,0,51.2-23.04,51.2-51.2V147.712C315.904,119.04,292.864,96.512,264.704,96.512z M430.08,124.672c-3.072,0.512-6.144,2.048-8.704,3.584l-79.872,46.08V293.12l80.384,46.08 c14.848,8.704,33.28,3.584,41.984-11.264c2.56-4.608,4.096-9.728,4.096-15.36V154.368 C467.968,135.424,450.048,120.064,430.08,124.672z" />
            </Icon>
          </PromptIconVideos>
        );
      default:
        return (
          <PromptIconAll  organizationName={organizationName}>
            <Icon aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
              <IconPath transform="translate(0 0)" d="M915 280l-165-8-10-108c-2-23-22-38-46-37l-592 49c-24 2-41 21-39 43l42 472c2 23 22 38 46 37l30-2-5 92c-1 25 18 46 45 47l660 31c26 1 48-17 50-42l28-527c1-25-19-45-45-47z M205 291l-14 270-35 49-32-356c0 0 0-1 0-1s0-1 0-1c1-10 9-18 19-19l522-43c10-1 19 6 21 16 0 0 1 0 1 1 0 0 1 0 1 1l5 62-438-21c-26-1-48 18-50 43z M873 765l-93-111-55-65c-5-6-13-11-21-11s-15 3-22 8l-33 24c-7 4-12 7-20 7-7 0-14-3-18-8-2-2-5-4-7-7l-86-98c-6-8-16-13-28-13-11-1-22 4-30 11l-216 232 1-14 14-258 7-126c0 0 0-1 0-1 0 0 0-1 0-1 3-11 12-19 24-18l582 28c12 1 21 9 21 20 0 0 1 1 1 1s1 1 1 1l-21 397z M746 525c39 0 70-32 70-70s-31-70-70-70c-39 0-70 31-70 70s31 70 70 70z" />
            </Icon>
          </PromptIconAll>
        );
    }
  };

  return getIcon();
};

const LightboxStoryPhoto = ({
  activeStory,
  containerRef,
  fullSize = true,
  landingPage = false,
  language,
  changing,
  onChangedFinished,
  organizationName
}) => {
  const mediaRef = React.createRef();
  const [state, setState] = useState({
    boundingBox: null,
    commentCount: activeStory.commentCount,
    hovering: false,
    imageLoaded: false,
    showComments: false
  });
  const [showVideoInfo, setShowVideoInfo] = useState(false);

  useEffect(() => {
    setState({ ...state, imageLoaded: !changing });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changing]);

  const computeBoundingBox = () => {
    const image = mediaRef.current;

    const imageRect = image.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    setState({
      ...state,
      boundingBox: {
        left: imageRect.left - containerRect?.left || 0,
        top: imageRect.top - containerRect?.top || 0,
        width: imageRect.width,
        height: imageRect.height,
        containerLeft: containerRect?.left || 0,
        containerTop: containerRect?.top || 0
      }
    });
  };

  const handleImageLoad = () => {
    setState({ ...state, imageLoaded: true });
    onChangedFinished();

    if (fullSize) {
      computeBoundingBox();
    }
  };

  const handleMouseEnter = () => {
    setState({ ...state, hovering: true });
  };

  const handleMouseLeave = () => {
    setState({ ...state, hovering: false });
  };

  const handlePlay = () => {
    mediaRef.current.play();
  };

  const { body, creator, question } = activeStory;
  const { parentStoryQuestion } = question;
  const imageUrl = activeStory.media.mediaType === "image"
    ? imageFromStory(imagesSizes.NORMAL, activeStory)
    : activeStory.media.thumbnail;

  return (
    <GalleryLightboxWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GalleryLightboxPhoto>
        <GalleryLightboxImageContainer
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        {activeStory.media.mediaType === "image" && (
          <LightboxImageSlider
            boxImages={activeStory.visuals}
            onImageLoad={handleImageLoad}
          />
        )}
        {activeStory.media.mediaType === "video" && (
          <>
            {showVideoInfo && (
              <div
                onClick={handlePlay}
                style={galleryLightboxVideoPlay}
                role="button"
                tabIndex={0}
              >
                <PlayIcon organizationName={organizationName} />
              </div>
            )}
            <Video
              autoPlay
              controls
              onPause={() => setShowVideoInfo(true)}
              onPlay={() => setShowVideoInfo(false)}
              onLoadedData={handleImageLoad}
              poster={activeStory.media.thumbnail}
              ref={mediaRef}
              src={activeStory.media.url}
              disablePictureInPicture
              crossOrigin="anonymous"
              controlsList="nodownload"
            >
              <Subtitles language={language} media={activeStory.media} />
            </Video>
          </>
        )}
        {!state.imageLoaded && <Loader />}
      </GalleryLightboxPhoto>

      <GalleryLightboxDetailsContainer>
        <ScrollableContainer>
          {parentStoryQuestion ? (
            <GalleryLightboxTitleContainer>
              <GalleryLightboxParentTitleContainer organizationName={organizationName}>
                <QuoteIcon organizationName={organizationName} />
                <Title organizationName={organizationName}>
                  {parentStoryQuestion?.question || question.question}
                </Title>
              </GalleryLightboxParentTitleContainer>
              <GalleryLightboxSubtitleContainer organizationName={organizationName}>
                <SubArrow width="22px" height="22px" viewBox="0 0 464 464">
                  <SubArrowPath
                    organizationName={organizationName}
                    d="M464.000251,24 C464.110373,115.256418 427.850906,202.794842 363.245,267.245 C331.912503,298.659235 294.78011,323.692873 253.908,340.957 C212.358482,358.538885 167.738665,367.71911 122.623,367.968 L90.666,344 L122.71,319.967 C200.312749,319.475993 274.573891,288.322547 329.3,233.3 C384.992218,177.911837 416.211732,102.545699 416,24 C416,10.745166 426.745166,2.84217094e-14 440,2.84217094e-14 C453.254834,2.84217094e-14 464.000251,10.745166 464.000251,24 L464.000251,24 Z M171.2,454.4 C179.1529,443.796133 177.003867,428.7529 166.4,420.8 L64,344 L166.4,267.2 C173.259499,262.055376 176.853314,253.642047 175.827688,245.129234 C174.802062,236.616421 169.312813,229.297422 161.427688,225.929234 C153.542563,222.561046 144.459499,223.655375 137.6,228.8 L9.6,324.8 C3.55665978,329.332505 0,336.445825 0,344 C0,351.554175 3.55665978,358.667495 9.6,363.2 L137.6,459.2 C142.692157,463.019117 149.09289,464.658962 155.394113,463.758788 C161.695335,462.858613 167.380883,459.492157 171.2,454.4 L171.2,454.4 Z"
                  />
                </SubArrow>
                <PromptIcon allowedTypes={question.allowedTypes}  organizationName={organizationName} />
                <QuestionText organizationName={organizationName}>
                  {question.question}
                </QuestionText>
              </GalleryLightboxSubtitleContainer>
            </GalleryLightboxTitleContainer>
          ) : (
            <GalleryLightboxTitleContainer>
              <GalleryLightboxParentTitleContainer organizationName={organizationName}>
                <QuoteIcon organizationName={organizationName} />
                <Title organizationName={organizationName}>
                  {parentStoryQuestion?.question || question.question}
                </Title>
              </GalleryLightboxParentTitleContainer>
            </GalleryLightboxTitleContainer>
          )}
          <Hr />

          {creator && (
            <GalleryLightBoxCreatorContainer>
              <Thumbnail
                title={creator.name}
                style={{ backgroundImage: `url("${creator.avatar.thumbUrl}")` }}
              />
              <div
                style={{ marginLeft: "10px" }}
              >
                <GalleryLightboxUploaderName organizationName={organizationName} >
                  {creator.name}
                </GalleryLightboxUploaderName>
                <GalleryLightboxUploaderDate organizationName={organizationName} >
                  {creator.title}
                </GalleryLightboxUploaderDate>
              </div>
            </GalleryLightBoxCreatorContainer>
          )}

          <EditorOutput output={body} showTags darkTags organizationName={organizationName} />
          <BottomShadow />
        </ScrollableContainer>
      </GalleryLightboxDetailsContainer>
    </GalleryLightboxWrapper>
  );
};

export default LightboxStoryPhoto;
