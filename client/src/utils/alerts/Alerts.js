import "./alerts.scss";
import React, { useEffect, useContext } from "react";
import AlertContext from "../../stores/alerts/alertContext";
import { createPortal } from "react-dom";
import { Icon } from "semantic-ui-react";

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  if (alerts)
    return (
      <div className="alerts-view">
        <p className="alerts-view__message">{alerts}</p>
      </div>
    );
  return null;
};

export default Alerts;
