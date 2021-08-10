import React from "react";
import Panel from "./Panel";

// This shouldn't be necessary, but is due to
// https://github.com/reactjs/react-modal/issues/497
const ReactModal = require("react-modal");

const ModalDialogHeading = ({
  children,
  bigCloseIcon,
  onClose,
  ...props
}) => (
  <Panel.Heading primary {...props}>
    {children}
    <buton aria-label="Close" className="chq-mdl--cl" onClick={onClose}>
      <svg aria-hidden="true" role="presentation" width="22px" height="22px" viewBox="0 0 1024 1024">
        <path transform="translate(0 0)" d="M887.2 774.2l-262.4-263.4 263-260c10.8-10.8 10.8-28.4 0-39.2l-74.8-75.2c-5.2-5.2-12.2-8-19.6-8s-14.4 3-19.6 8l-261.8 259.2-262.2-259c-5.2-5.2-12.2-8-19.6-8s-14.4 3-19.6 8l-74.6 75.2c-10.8 10.8-10.8 28.4 0 39.2l263 260-262.2 263.2c-5.2 5.2-8.2 12.2-8.2 19.6s2.8 14.4 8.2 19.6l74.8 75.2c5.4 5.4 12.4 8.2 19.6 8.2 7 0 14.2-2.6 19.6-8.2l261.2-262.4 261.4 262.2c5.4 5.4 12.4 8.2 19.6 8.2 7 0 14.2-2.6 19.6-8.2l74.8-75.2c5.2-5.2 8.2-12.2 8.2-19.6-0.2-7.2-3.2-14.2-8.4-19.4z" />
      </svg>
    </buton>
  </Panel.Heading>
);

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: 2147483647
  }
};

const ModalDialog = ({
  appElement = document.body,
  bodyOpenClassName,
  children,
  contentRef,
  ariaLabelledBy,
  ariaDescribedby,
  onClose,
  style = undefined
}) => (
  <ReactModal
    aria={{
      labelledby: ariaLabelledBy,
      describedby: ariaDescribedby,
      modal: true
    }}
    appElement={appElement}
    bodyOpenClassName={bodyOpenClassName || ""}
    contentRef={contentRef}
    onRequestClose={onClose}
    isOpen
    style={
      style ? {
        ...modalStyle,
        overlay: { ...modalStyle.overlay, ...style.overlay },
        content: style.content
      } : modalStyle
    }
  >
    {children}
  </ReactModal>
);

ModalDialog.Heading = ModalDialogHeading;
ModalDialog.Body = Panel.Body;
ModalDialog.LoaderBody = Panel.LoaderBody;
ModalDialog.Footer = Panel.Footer;

export default ModalDialog;
