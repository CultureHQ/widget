import React, { useState } from "react";
import styled from "styled-components";
import IconsPagination from "./IconsPagination";

const PlainButton = styled.button`
  appearance: none;
  background: rgba(255, 255, 255, 0.8);
  border: 0;
  border-radius: 30px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  color: #6a89af;
  cursor: pointer;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  height: 35px;
  line-height: inherit;
  margin: 0;
  padding: 6px;
  position: absolute;
  top: calc(50% - 10px);
  width: 35px;
  z-index: 10;
`;

const ContainerLightbox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  margin-bottom: 0;
  margin-top: 0;
  width: 100%;

  @media only screen and (min-width: 768px) {
    position: absolute;
  }
`;

const ImageSliderItem = styled.div`
  display: none;
  flex-direction: column;
  height: 100%;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  width: 100%;

  &.active {
    display: block;
  }

  @media only screen and (min-width: 768px) {
    border-radius: 6px;
  }
`;

const Image = styled.img`
  display: block;
  height: auto;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  width: auto;

  @media only screen and (min-width: 768px) {
    left: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`;

const NavigationBox = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  position: absolute;
  z-index: 20;
`;

const LightboxImageSlider = ({
  boxImages,
  onImageLoad
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const quantity = boxImages?.length;

  if (!Array.isArray(boxImages) || quantity === 0) return <></>;

  const nextImage = () => {
    setCurrentImage(currentImage === quantity - 1 ? 0 : currentImage + 1);
  };

  const previousImage = () => {
    setCurrentImage(currentImage === 0 ? quantity - 1 : currentImage - 1);
  };

  const handleSliderChange = page => {
    setCurrentImage(page - 1);
  };

  return (
    <>
      <ContainerLightbox>
        {boxImages.map((image, index) => (
          <ImageSliderItem
            key={index}
            className={currentImage === index ? "active" : undefined}
          >
            <Image
              className="gallery-lightbox__main-image"
              src={image.url}
              onLoad={onImageLoad}
              alt={image.alt}
            />
          </ImageSliderItem>
        ))}
        {boxImages.length > 1 && (
          <>
            <div>
              <PlainButton
                aria-label="Previous"
                onClick={previousImage}
                style={{ left: "10px", paddingLeft: "2px" }}
              >
                <svg
                  aria-hidden="true"
                  role="presentation"
                  width="22px"
                  height="22px"
                  viewBox="0 0 1024 1024"
                >
                  <path transform="translate(0 0)" d="M427.4 512v0 0l334.4-348.2c8.4-8.6 8.2-22.8-0.4-31.6l-59.8-61.2c-8.6-8.8-22.6-9-31-0.4l-408.4 425.2c-4.4 4.4-6.4 10.4-6 16.2-0.2 6 1.8 11.8 6 16.2l408.4 425.4c8.4 8.6 22.4 8.4 31-0.4l59.8-61.2c8.6-8.8 8.8-23 0.4-31.6l-334.4-348.4z" />
                </svg>
              </PlainButton>
            </div>
            <div>
              <PlainButton
                aria-label="Next"
                onClick={nextImage}
                style={{ right: "10px", paddingRight: "2px" }}
              >
                <svg
                  aria-hidden="true"
                  role="presentation"
                  width="22px"
                  height="22px"
                  viewBox="0 0 1024 1024"
                >
                  <path transform="translate(0 0)" d="M596.6 512v0 0l-334.4-348.2c-8.4-8.6-8.2-22.8 0.4-31.6l59.8-61.2c8.6-8.8 22.6-9 31-0.4l408.4 425.4c4.4 4.4 6.4 10.4 6 16.2 0.2 6-1.8 11.8-6 16.2l-408.4 425.2c-8.4 8.6-22.4 8.4-31-0.4l-59.8-61.2c-8.6-8.8-8.8-23-0.4-31.6l334.4-348.4z" />
                </svg>
              </PlainButton>
            </div>
            <NavigationBox>
              <IconsPagination
                currentPage={currentImage + 1}
                onClick={handleSliderChange}
                totalPages={boxImages.length}
              />
            </NavigationBox>
          </>
        )}
      </ContainerLightbox>
    </>
  );
};

export default LightboxImageSlider;
