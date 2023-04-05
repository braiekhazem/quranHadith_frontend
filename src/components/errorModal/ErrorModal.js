import React from "react";
import { useDialogContext } from "../../context/dialogStore";
import "./errorModal.css";
import error from "./../../assets/icon/xmark-solid.svg";
import success from "./../../assets/icon/check-solid.svg";

function ErrorModal() {
  const { message, hidePopup, type } = useDialogContext();

  return (
    <div className="popup">
      <div
        className="popup__response"
        style={{ backgroundColor: `${type === "ERROR" ? "red" : "green"}` }}
      >
        <p>
          <img
            src={type === "ERROR" ? error : success}
            alt=""
            className="mediumSizeImg"
          />
        </p>
      </div>
      <div className="popup__message">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorModal;
