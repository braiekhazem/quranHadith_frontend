import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";

const initialState = {
  show: false,
  message: "",
  type: "",
};

const DialogContext = createContext({
  ...initialState,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "show":
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        show: true,
      };

    case "hide":
      return {
        ...initialState,
      };

    default:
      return { ...state };
  }
};

function DialogProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const showPopup = (message, type = "ERROR") => {
    dispatch({
      type: "show",
      payload: {
        message,
        type,
      },
    });
  };
  const hidePopup = () => {
    dispatch({
      type: "hide",
      payload: {
        type: "ERROR",
      },
    });
  };

  useEffect(() => {
    if (state.show) {
      setTimeout(() => {
        hidePopup();
      }, 1500);

      //   clearTimeout(timer);
    }
  }, [state.show]);

  return (
    <DialogContext.Provider value={{ ...state, showPopup, hidePopup }}>
      {props.children}
    </DialogContext.Provider>
  );
}

const useDialogContext = () => useContext(DialogContext);

export { useDialogContext, DialogProvider };
