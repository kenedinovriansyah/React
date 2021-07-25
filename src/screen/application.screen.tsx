import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { allActions } from "../configureStore/actions/all.actions";
import _ from "lodash";
import "./static/application.scss";
import LeftCols from "./application/left";
import { ApplicationState } from "../configureStore";
import { allDispatch } from "../configureStore/extensions/dispatch";
import { ColsRightContext, ColsRightContextApp } from "../context/cols.right";

const ApplicationScreen = () => {
  const selector = useSelector((state: ApplicationState) => state.default);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(
        allActions.all({
          url: "/api/v1/user/accounts/me/",
          status: 200,
          method: "get",
          auth: true,
          json: true,
        })
      );
    }
    return () => {
      mounted = false;
    };
  }, []);

  const click = (name: string, type: string) => {
    switch (type) {
      case "parent-page":
        allDispatch.defaultDispatch(
          dispatch,
          {
            active: 0,
            page: selector.drawer.page,
            child_page: selector.drawer.child_page,
            title: selector.drawer.title,
            breadcrumbs: selector.drawer.breadcrumbs,
            parent_page: name,
          },
          "drawer"
        );
        break;

      default:
        break;
    }
  };

  return (
    <ColsRightContext.Provider
      value={{
        open: selector.drawer,
        click,
      }}
    >
      <div>
        <div className="app-grid">
          <div className="app-cols">
            <LeftCols />
          </div>
          <div className="app-cols">
            <div className="app-right">
              <ColsRightContextApp />
            </div>
          </div>
        </div>
      </div>
    </ColsRightContext.Provider>
  );
};

export default ApplicationScreen;
