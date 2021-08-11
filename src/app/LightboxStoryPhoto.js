/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import imageFromStory from "./utils/getImageFromStory";
import imagesSizes from "./utils/imagesSizes";
import { TimeDiff } from "./utils/Time";
import EditorOutput from "./EditorOutput";
import Loader from "./Loader";

import { font } from "../styles.json";

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
  height: auto;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  position: relative;
  width: auto;

  @media (min-width: 768px) {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
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
  align-items: center;
  display: flex;
  padding-right: 20px;
`;

const Title = styled.h1`
  color: #5c5f67;
  font-family: ${font};
  font-size: 20px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0 0 0 12px;

  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const GalleryLightBoxCreatorContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 15px;
  position: relative;
`;

const GalleryLightboxUploaderDate = styled.div`
  color: #c9c9c9;
  font-family: ${font};
  font-size: 16px;
  font-weight: 200;
  line-height: 1.42857143;
`;

const QuoteIcon = styled.svg`
  height: 42px;
  min-width: 42px;
  transform: scaleX(-1);
  width: 42px;
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
  height: 45px;
  width: 45px;
`;

const GalleryLightboxUploaderName = styled.span`
  color: #6a89af;
  font-family: ${font};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.42857143;
  padding-bottom: 5px;
`;

const VideoPlaySvg = styled.svg`
  height: 80px;
  width: 80px;
`;

const GalleryLightboxImageContainer = styled.div`
  background-size: cover;
  filter: blur(2px);
  left: 50%;
  opacity: .3;
  position: relative;
  top: 50%;
  transform: scale(11);
  width: 10%;

  @media (min-width: 768px) {
    height: 10%;
  }
`;

const GalleryLightboxMainImage = styled.img`
  display: block;
  height: auto;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  position: relative;
  width: auto;

  @media (min-width: 768px) {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BottomShadow = styled.div`
  background-image: linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0) 100%);
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

const LightboxStoryPhoto = ({
  activeStory,
  containerRef,
  fullSize = true,
  landingPage = false,
  changing,
  onChangedFinished
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

  useEffect(
    () => {
      setState({ ...state, imageLoaded: !changing });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changing]
  );

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

  const { body, creator, createdAt, question } = activeStory;
  const imageUrl = activeStory.media.mediaType === "image" ? imageFromStory(imagesSizes.FULL, activeStory) : activeStory.media.thumbnail;
  return (
    <GalleryLightboxWrapper
      className="gallery-lightbox__wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GalleryLightboxPhoto className="gallery-lightbox__photo col-sm-7 col-xs-12">
        <GalleryLightboxImageContainer className="gallery-lightbox__image-container" style={{ backgroundImage: `url(${imageUrl})` }} />
        {activeStory.media.mediaType === "image" && (
          <GalleryLightboxMainImage
            className="gallery-lightbox__main-image"
            ref={mediaRef}
            src={imageUrl}
            onLoad={handleImageLoad}
            alt={activeStory.imageAlt || question.question}
          />
        )}
        {activeStory.media.mediaType === "video" && (
          <>
            {showVideoInfo && (
              <div
                className="gallery-lightbox__video-play"
                onClick={handlePlay}
                onKeyPress={() => {}}
                style={galleryLightboxVideoPlay}
                role="button"
                tabIndex={0}
              >
                <VideoPlaySvg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 512 512">
                  <path fill="#FFFFFF" transform="translate(0 0)" d="M238.933,0C106.974,0,0,106.974,0,238.933s106.974,238.933,238.933,238.933s238.933-106.974,238.933-238.933 C477.726,107.033,370.834,0.141,238.933,0z M339.557,246.546c-1.654,3.318-4.343,6.008-7.662,7.662v0.085L195.362,322.56 c-8.432,4.213-18.682,0.794-22.896-7.638c-1.198-2.397-1.815-5.043-1.8-7.722V170.667c-0.004-9.426,7.633-17.07,17.059-17.075 c2.651-0.001,5.266,0.615,7.637,1.8l136.533,68.267C340.331,227.863,343.762,238.11,339.557,246.546z" />
                </VideoPlaySvg>
              </div>
            )}
            <Video
              autoPlay
              controls
              className="gallery-lightbox__main-image"
              onPause={() => setShowVideoInfo(true)}
              onPlay={() => setShowVideoInfo(false)}
              onLoadedData={handleImageLoad}
              poster={activeStory.media.thumbnail}
              ref={mediaRef}
              src={activeStory.media.url}
            />
          </>
        )}
        {!state.imageLoaded && (
          <Loader />
        )}
      </GalleryLightboxPhoto>

      <GalleryLightboxDetailsContainer className="gallery-lightbox__details-container col-sm-5 col-xs-12">
        <ScrollableContainer className={`scrollable-container ${landingPage ? "full-height" : ""}`}>
          <GalleryLightboxTitleContainer className="gallery-lightbox__title-container">
            <QuoteIcon ariaHidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
              <path fill="#8cb4d6" transform="translate(0 0)" d="M925.036,57.197h-304c-27.6,0-50,22.4-50,50v304c0,27.601,22.4,50,50,50h145.5c-1.9,79.601-20.4,143.3-55.4,191.2 c-27.6,37.8-69.399,69.1-125.3,93.8c-25.7,11.3-36.8,41.7-24.8,67.101l36,76c11.6,24.399,40.3,35.1,65.1,24.399 c66.2-28.6,122.101-64.8,167.7-108.8c55.601-53.7,93.7-114.3,114.3-181.9c20.601-67.6,30.9-159.8,30.9-276.8v-239 C975.036,79.598,952.635,57.197,925.036,57.197z M106.036,913.497c65.4-28.5,121-64.699,166.9-108.6c56.1-53.7,94.4-114.1,115-181.2c20.6-67.1,30.899-159.6,30.899-277.5 v-239c0-27.6-22.399-50-50-50h-304c-27.6,0-50,22.4-50,50v304c0,27.601,22.4,50,50,50h145.5c-1.9,79.601-20.4,143.3-55.4,191.2 c-27.6,37.8-69.4,69.1-125.3,93.8c-25.7,11.3-36.8,41.7-24.8,67.101l35.9,75.8C52.336,913.497,81.236,924.298,106.036,913.497z" />
            </QuoteIcon>
            <Title className="title">{question.question}</Title>
          </GalleryLightboxTitleContainer>
          <Hr />

          {creator && (
            <GalleryLightBoxCreatorContainer className="gallery-lightbox__creator-container">
              <Thumbnail title={creator.name} style={{ backgroundImage: `url("${creator.avatar.thumbUrl}")` }} />
              <div className="gallery-lightbox__creator-information" style={{ marginLeft: "10px" }}>
                <GalleryLightboxUploaderName>{creator.name}</GalleryLightboxUploaderName>
                <GalleryLightboxUploaderDate className="gallery-lightbox__uploader-date">
                  <TimeDiff time={createdAt} />
                </GalleryLightboxUploaderDate>
              </div>
            </GalleryLightBoxCreatorContainer>
          )}

          <EditorOutput output={body} showTags darkTags />
          <BottomShadow />
        </ScrollableContainer>
      </GalleryLightboxDetailsContainer>
    </GalleryLightboxWrapper>
  );
};

export default LightboxStoryPhoto;
