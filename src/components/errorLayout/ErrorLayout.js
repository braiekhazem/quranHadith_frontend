import React from "react";
import { useDialogContext } from "../../context/dialogStore";
import ErrorModal from "../errorModal/ErrorModal";

function ErrorLayout({ children }) {
  const { show } = useDialogContext();
  return (
    <div className="Layouts global-centring">
      {children}

      {show && <ErrorModal />}
    </div>
  );
}

export default ErrorLayout;
