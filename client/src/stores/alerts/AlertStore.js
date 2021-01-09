import React, { useState } from "react";
import { AlertProvider } from "./alertContext";
import alertReducer from "./alertReducer";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, CLEAR_ALERT } from "../types";

const InitialState = [];

const AlertStore = ({ children }) => {
  const [alerts, setAlert] = useState(null);

  function generateAlert(message) {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const value = {
    alerts,
    generateAlert,
  };

  return <AlertProvider value={value}>{children}</AlertProvider>;
};

export default AlertStore;
