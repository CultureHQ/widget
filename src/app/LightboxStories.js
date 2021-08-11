import React, { PureComponent, useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";

import LightboxStoryPhoto from "./LightboxStoryPhoto";
import ChqModal from "./ChqModal";
import { font } from "../styles.json";
import ModalDialog from "./ModalDialog";

const mobileModal = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    opacity: "1",
    overflowX: "hidden",
    overflowY: "auto",
    zIndex: "99000000000"
  },
  content: {
    animation: "chqMdlZoomIn 300ms ease-out forwards",
    backgroundColor: "white",
    border: "0",
    borderRadius: "6px",
    boxShadow: "0 5px 15px rgb(0 0 0 / 50%)",
    display: "grid",
    fontFamily: `${font}`,
    height: "100%",
    inset: "0",
    letterSpacing: "normal",
    lineHeight: "normal",
    margin: "0",
    maxWidth: "100%",
    opacity: "1",
    overflow: "visbile",
    padding: "0",
    position: "initial",
    minHeight: "initial",
    width: "100%"
  }
};

const modal = {
  overlay: mobileModal.overlay,
  content: { ...mobileModal.content, height: "initial", margin: "5% auto", maxWidth: "90vw", with: "90vw" }
};

const mobileModalBody = {
  backgroundColor: "#fff",
  fontWeight: "200",
  overflow: "scroll",
  padding: "61px 0 0",
  position: "relative"
};

const modalBody = {
  ...mobileModalBody,
  backgroundColor: "#000",
  borderRadius: "6px",
  overflow: "initial",
  padding: "0"
};

const GalleryLightboxActions = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: 15px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 30;

  @media (min-width: 992px) {
    right: -50px;
  }

  @media (min-width: 768px) {
    background-color: transparent;
    left: initial;
    position: absolute;
    right: -30px;
    top: -60px;
  }
`;

const Navigation = styled.div`
  display: block;

  @media (min-width: 768px) {
    display:none;
  }
`;

const chqPbn = {
  WebkitAppearance: "none",
  appearance: "none",
  background: "transparent",
  border: "0",
  color: "#6a89af",
  cursor: "pointer",
  display: "inline",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  margin: "0",
  padding: "1px 1px 0"
};

const CloseIcon = styled.svg`
  height: 25px;
  opacity: .9;
  transition: opacity 300ms ease-in-out;
  width: 25px;

  @media (min-width: 768px) {
    height: 35px;
    width: 35px;
  }
`;

const GalleryLighboxChevron = styled.button`
  background: none;
  border: 0;
  display: none;
  opacity: .75;
  outline: none;
  padding: 6px;
  position: absolute;
  top: 38vh;
  transition: opacity 300ms ease-in-out;
  z-index: 20;

  @media (min-width: 768px) {
    display: block;
  }
`;

const ChevronSvg = styled.svg`
  fill: #fff;
  height: 40px;
  margin-top: 2px;
  width: 40px;
`;

const Path = styled.path`
  fill: #000;

  @media (min-width: 768px) {
    fill: #fff;
  }
`;

const LightboxArrows = ({ onSwipeLeft, onSwipeRight }) => (
  <>
    <GalleryLighboxChevron aria-label="Go to previous" type="button" className="gallery-lightbox__chevron-left" onClick={onSwipeLeft} style={{ left: "-50px" }}>
      <ChevronSvg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
        <path fill="#FFFFFF" transform="translate(0 0)" d="M427.4 512v0 0l334.4-348.2c8.4-8.6 8.2-22.8-0.4-31.6l-59.8-61.2c-8.6-8.8-22.6-9-31-0.4l-408.4 425.2c-4.4 4.4-6.4 10.4-6 16.2-0.2 6 1.8 11.8 6 16.2l408.4 425.4c8.4 8.6 22.4 8.4 31-0.4l59.8-61.2c8.6-8.8 8.8-23 0.4-31.6l-334.4-348.4z" />
      </ChevronSvg>
    </GalleryLighboxChevron>
    <GalleryLighboxChevron aria-label="Go to next" type="button" className="gallery-lightbox__chevron-right" onClick={onSwipeRight} style={{ right: "-50px" }}>
      <ChevronSvg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
        <path transform="translate(0 0)" d="M596.6 512v0 0l-334.4-348.2c-8.4-8.6-8.2-22.8 0.4-31.6l59.8-61.2c8.6-8.8 22.6-9 31-0.4l408.4 425.4c4.4 4.4 6.4 10.4 6 16.2 0.2 6-1.8 11.8-6 16.2l-408.4 425.2c-8.4 8.6-22.4 8.4-31-0.4l-59.8-61.2c-8.6-8.8-8.8-23-0.4-31.6l334.4-348.4z" />
      </ChevronSvg>
    </GalleryLighboxChevron>
  </>
);

const LightboxActions = ({
  onClose, onSwipeLeft, onSwipeRight
}) => (
  <GalleryLightboxActions className="gallery-lightbox--actions">
    <Navigation className="navigation">
      <button className="left-arrow" aria-label="Go to previous" onClick={onSwipeLeft} style={{ ...chqPbn, marginRight: "20p" }} type="button">
        <svg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
          <path transform="translate(0 0)" d="M427.4 512v0 0l334.4-348.2c8.4-8.6 8.2-22.8-0.4-31.6l-59.8-61.2c-8.6-8.8-22.6-9-31-0.4l-408.4 425.2c-4.4 4.4-6.4 10.4-6 16.2-0.2 6 1.8 11.8 6 16.2l408.4 425.4c8.4 8.6 22.4 8.4 31-0.4l59.8-61.2c8.6-8.8 8.8-23 0.4-31.6l-334.4-348.4z" />
        </svg>
      </button>
      <button className="right-arrow" aria-label="Go to next" onClick={onSwipeRight} style={{ ...chqPbn, marginRight: "20p" }} type="button">
        <svg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
          <path transform="translate(0 0)" d="M596.6 512v0 0l-334.4-348.2c-8.4-8.6-8.2-22.8 0.4-31.6l59.8-61.2c8.6-8.8 22.6-9 31-0.4l408.4 425.4c4.4 4.4 6.4 10.4 6 16.2 0.2 6-1.8 11.8-6 16.2l-408.4 425.2c-8.4 8.6-22.4 8.4-31-0.4l-59.8-61.2c-8.6-8.8-8.8-23-0.4-31.6l334.4-348.4z" />
        </svg>
      </button>
    </Navigation>
    <div className="actions">
      <button aria-label="Close" onClick={onClose} style={chqPbn} type="button">
        <CloseIcon aria-hidden="true" role="presentation" width="35px" height="35px" viewBox="0 0 1024 1024">
          <Path fill="#FFFFFF" transform="translate(0 0)" d="M887.2 774.2l-262.4-263.4 263-260c10.8-10.8 10.8-28.4 0-39.2l-74.8-75.2c-5.2-5.2-12.2-8-19.6-8s-14.4 3-19.6 8l-261.8 259.2-262.2-259c-5.2-5.2-12.2-8-19.6-8s-14.4 3-19.6 8l-74.6 75.2c-10.8 10.8-10.8 28.4 0 39.2l263 260-262.2 263.2c-5.2 5.2-8.2 12.2-8.2 19.6s2.8 14.4 8.2 19.6l74.8 75.2c5.4 5.4 12.4 8.2 19.6 8.2 7 0 14.2-2.6 19.6-8.2l261.2-262.4 261.4 262.2c5.4 5.4 12.4 8.2 19.6 8.2 7 0 14.2-2.6 19.6-8.2l74.8-75.2c5.2-5.2 8.2-12.2 8.2-19.6-0.2-7.2-3.2-14.2-8.4-19.4z" />
        </CloseIcon>
      </button>
    </div>
  </GalleryLightboxActions>
);

class LightboxStoriesWrapper extends PureComponent {
  containerRef = React.createRef();

  timeout = 0;

  static defaultProps = {
    onStoryChange: () => {}
  };

  state = {
    fullSize: false,
    modalStyle: window.innerWidth >= 768 ? modal : mobileModal,
    modalBodyStyle: window.innerWidth >= 768 ? modalBody : mobileModalBody
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateModalStyle);

    const { modalIsOpen } = this.props;
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  componentDidUpdate(prevProps) {
    window.addEventListener("resize", this.updateModalStyle);

    const { modalIsOpen } = this.props;

    if (modalIsOpen !== prevProps.modalIsOpen) {
      clearTimeout(this.timeout);

      if (modalIsOpen) {
        this.listener = window.addEventListener("keydown", this.handleKeyDown);
        this.timeout = setTimeout(() => this.setState({ fullSize: true }), 500);
      } else {
        this.setState({ fullSize: false });
      }
    }

    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    document.body.style.overflow = "unset";
  }

  updateModalStyle = () => {
    if (window.innerWidth >= 768) {
      this.setState({ modalStyle: modal, modalBodyStyle: modalBody });
    } else {
      this.setState({ modalStyle: mobileModal, modalBodyStyle: mobileModalBody });
    }
  };

  handleClose = () => {
    const { onClose, setChanging } = this.props;

    window.removeEventListener("keydown", this.handleKeyDown);
    this.listener = null;

    setChanging(false);
    onClose();
  };

  handleKeyDown = event => {
    const { handleSwipeLeft, handleSwipeRight } = this.props;
    switch (event.key) {
      case "ArrowLeft":
        handleSwipeLeft();
        break;
      case "ArrowRight":
        handleSwipeRight();
        break;
      default:
        break;
    }
  };

  render() {
    const {
      hideLinks,
      isTrendsetter,
      modalIsOpen,
      stories,
      onStoryCheerToggle,
      onDelete,
      activeStory,
      onCommentsChange,
      onStoryUpdate,
      isWelcomePage,
      noActions,
      landingPage,
      preview,
      showProfileLink,
      organization,
      handlers,
      changing,
      setChanging,
      handleSwipeLeft,
      handleSwipeRight
    } = this.props;
    const { fullSize, modalBodyStyle, modalStyle } = this.state;

    if (!modalIsOpen) {
      return null;
    }

    return (
      <>
        <ChqModal
          entrance="zoomIn"
          onClose={this.handleClose}
          style={modalStyle}
        >
          <ModalDialog.Body style={modalBodyStyle}>
            <div ref={this.containerRef} {...handlers}>
              {activeStory && (
                <div className="Story-Image" style={{ height: "100%" }}>
                  <LightboxStoryPhoto
                    activeStory={activeStory}
                    containerRef={this.containerRef}
                    fullSize={fullSize}
                    hideLinks={hideLinks}
                    isTrendsetter={isTrendsetter}
                    onCommentsChange={onCommentsChange}
                    onTagDelete={this.handleTagDelete}
                    onTagStart={this.handleTagStart}
                    onStoryCheerToggle={onStoryCheerToggle}
                    noActions={noActions}
                    landingPage={landingPage}
                    preview={preview}
                    showProfileLink={showProfileLink}
                    changing={changing}
                    onChangedFinished={() => setChanging(false)}
                    onDelete={onDelete}
                    onStoryUpdate={onStoryUpdate}
                    isWelcomePage={isWelcomePage}
                  />
                </div>
              )}

              {activeStory && (
                <LightboxActions
                  activeStory={activeStory}
                  onClose={this.handleClose}
                  landingPage={landingPage}
                  organization={organization}
                  preview={preview}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                />
              )}

              {stories.length > 1 && (
                <LightboxArrows
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                />
              )}
            </div>
          </ModalDialog.Body>
        </ChqModal>
      </>
    );
  }
}

const LightboxStories = ({ activeStory, onStoryChange, stories, ...props }) => {
  const [changing, setChanging] = useState(false);

  const handleSwipeLeft = () => {
    setChanging(true);
    onStoryChange(stories.findIndex(story => story.id === activeStory.id) - 1);
  };

  const handleSwipeRight = () => {
    setChanging(true);
    onStoryChange(stories.findIndex(story => story.id === activeStory.id) + 1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeRight(),
    onSwipedRight: () => handleSwipeLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <LightboxStoriesWrapper
      {...props}
      handlers={handlers}
      activeStory={activeStory}
      onStoryChange={onStoryChange}
      stories={stories}
      changing={changing}
      setChanging={setChanging}
      handleSwipeLeft={handleSwipeLeft}
      handleSwipeRight={handleSwipeRight}
    />
  );
};

export default LightboxStories;
