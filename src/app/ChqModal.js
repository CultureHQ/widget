import React from "react";
import ModalDialog from "./ModalDialog";

const ChqModal = ({ children, customAppElement, ...props }) => {
  // Try to find the root element, fall back to document.body if not found
  const rootRef = customAppElement || document.getElementById("root") || document.body;

  return (
    <ModalDialog {...props} appElement={rootRef}>
      {children}
    </ModalDialog>
  );
};

export default ChqModal;
