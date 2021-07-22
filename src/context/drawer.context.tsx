import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { allDispatch } from "../configureStore/extensions/dispatch";

interface ContextProps {
  open: number;
}

export const DrawerContext = React.createContext<Partial<ContextProps>>({});
export const DrawerContextApp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const click = (name: string, params: string) => {
    allDispatch.defaultDispatch(dispatch, 2, "drawer");
    setTimeout(() => {
      if (params) {
        history.push(`${name}${params}`);
      } else {
        history.push(name);
      }
    }, 300);
  };
  return (
    <DrawerContext.Consumer>
      {({ open }) => {
        return (
          <div
            className={
              open === 1 ? "drawer" : open === 2 ? "drawer-close" : "hidden"
            }
          >
            <div className="drawer-block"></div>
            <div className="drawer-list">
              <div className="list-anchor">
                <a href="">
                  <span>Support</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
                <a href="">
                  <span>Company</span>
                  <i className="fas fa-chevron-right"></i>
                </a>
                <a href="">
                  <div className="groups">
                    <i className="fas fa-globe-asia"></i>
                    <span>Select Language</span>
                  </div>
                  <i className="fas fa-chevron-right"></i>
                </a>
              </div>
              <div className="button-app">
                <button
                  className="go"
                  onClick={click.bind("", "/loading/", "access-login")}
                >
                  <span>go to application</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </DrawerContext.Consumer>
  );
};
