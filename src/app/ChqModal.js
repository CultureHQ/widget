import React from "react";
import ModalDialog from "./ModalDialog";

const ChqModal = ({ children, ...props }) => {
  const rootRef = document.getElementById("root");

  if (!rootRef) {
    console.warn('Modal: Could not find root element. Modal may not work as expected.');
  }

  return (
    <ModalDialog {...props} appElement={rootRef}>
      {children}
    </ModalDialog>
  );
};

export default ChqModal;
