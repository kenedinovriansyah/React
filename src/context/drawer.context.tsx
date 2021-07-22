import React from "react";

interface ContextProps {
  open: number;
}

export const DrawerContext = React.createContext<Partial<ContextProps>>({});
export const DrawerContextApp = () => {
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
                <button className="go">
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
