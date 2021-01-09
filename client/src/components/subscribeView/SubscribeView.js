import "./subscribeview.scss";
import React, { useEffect } from "react";
import { useAuthState } from "../../stores/auth/authStateContext";
import { useSubscribeState } from "../../stores/subscriptions/subscribeStateContext";
import { useSubscribeActions } from "../../stores/subscriptions/subscribeActionContext";
import SubscribeItem from "./SubscribeItem";
import Spinner from "../../utils/spinner/Spinner";
import axios from "axios";

const SubscribeView = () => {
  const { subscriptions, statusSubscriptions } = useSubscribeState();
  const { fetchSubs } = useSubscribeActions();
  const { user } = useAuthState();
  useEffect(() => {
    if (user) fetchSubs(axios.get("/api/v1/subscriptions"));
  }, [user]);
  function renderSubscriptions(list) {
    return list.map(function generateItem(subscribe) {
      return <SubscribeItem key={subscribe._id} subscribe={subscribe} />;
    });
  }

  if (!user) return null;
  if (statusSubscriptions === "idle" || statusSubscriptions === "pending")
    return <Spinner classStyle="center" />;
  if (statusSubscriptions === "resolved")
    return (
      <div className="subscription">
        <h2 className="subscription__infotitle">Subscriptions</h2>
        <nav className="subscription__nav ">
          <ul className="subscription__list">
            {renderSubscriptions(subscriptions)}
          </ul>
        </nav>
      </div>
    );
};

export default SubscribeView;
