import React from "react";
import ModalDialog from "./ModalDialog";

const ChqModal = ({ children, ...props }) => {
  const rootRef = document.getElementById("root");

  return (
    <ModalDialog {...props} appElement={rootRef}>
      {children}
    </ModalDialog>
  );
};

export default ChqModal;
