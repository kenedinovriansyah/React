import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { allDispatch } from "../configureStore/extensions/dispatch";
import "./static/loading.scss";

const LoadingScreen = () => {
  const history = useHistory();
  const params: any = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      localStorage.setItem("active", "true");
      allDispatch.defaultDispatch(dispatch, true, "hidden");
      setTimeout(() => {
        if (params.name === "home") {
          history.push(`/`);
          allDispatch.defaultDispatch(dispatch, false, "hidden");
        } else {
          allDispatch.defaultDispatch(dispatch, false, "hidden");

          history.push(`/${params.name}`);
        }
      }, 2000);
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="loading">
      <div className="cp-spinner cp-bubble"></div>
    </div>
  );
};

export default LoadingScreen;
