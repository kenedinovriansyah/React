import React from "react";
import { Drawer } from "../configureStore/types/interface";
import _ from "lodash";
import { PasswordContext, PasswordContextApp } from "./password.context";
import camera from "../media/icons/camera.svg";
import { Icons } from "../ref/icons";
import CreateForm from "./applicationForm/create.form";

interface ContextProps {
  open: Drawer;
  click(name: string, type: string): void;
}

export const ColsRightContext = React.createContext<Partial<ContextProps>>({});
export const ColsRightContextApp = () => {
  const [state, setState] = React.useState({ avatar: null, avatar_url: "" });

  const changeFiles = (args: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      avatar: args.currentTarget.files[0],
      avatar_url: URL.createObjectURL(args.currentTarget.files[0]),
    });
  };
  return (
    <ColsRightContext.Consumer>
      {({ open, click }) => {
        switch (open.child_page) {
          case "accounts":
            return (
              <>
                <PasswordContext.Provider
                  value={{
                    open: open.parent_page,
                  }}
                >
                  <div className="headers">
                    <div className="title">
                      <h5>{open.title}</h5>
                    </div>
                    <ul className="location">
                      {_.map(open.breadcrumbs, (base, index) => {
                        return (
                          <li key={index}>
                            <a>
                              <span>{base}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <ul className="app-tabs">
                    <li>
                      <a href="">General</a>
                    </li>
                    <li>
                      <a href="">Billing</a>
                    </li>
                    <li>
                      <a href="">Notifications</a>
                    </li>
                    <li>
                      <a href="">Social Links</a>
                    </li>
                    <li
                      className={open.parent_page === "email" ? "active" : ""}
                    >
                      <a
                        href="#"
                        onClick={click.bind("", "email", "parent-page")}
                      >
                        Email Password
                      </a>
                    </li>
                    <li
                      className={
                        open.parent_page === "password" ? "active" : ""
                      }
                    >
                      <a
                        href="#"
                        onClick={click.bind("", "password", "parent-page")}
                      >
                        Change Password
                      </a>
                    </li>
                  </ul>
                  <PasswordContextApp />
                </PasswordContext.Provider>
              </>
            );
            break;
          case "create":
            return (
              <div>
                <div className="headers">
                  <div className="title">
                    <h5>{open.title}</h5>
                  </div>
                  <ul className="location">
                    {_.map(open.breadcrumbs, (base, index) => {
                      return (
                        <li key={index}>
                          <a>
                            <span>{base}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="create-grid">
                  <div className="create-cols">
                    <div className="create-upload-avatar">
                      <div className="upload-avatar">
                        <div className="upload-btn-wrapper">
                          <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            className="avatar"
                            onChange={changeFiles}
                            accept=".jpg,jpeg,.png"
                          />
                          {state.avatar_url ? (
                            <img
                              src={state.avatar_url}
                              alt=""
                              className="avatar"
                            />
                          ) : (
                            <div className="child-upload-avatar">
                              <Icons src={camera} className="icons" />
                              <span>Upload photo</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="title">
                        <span>Allowed *.jpeg, *.jpg, *.png, *.gif</span>{" "}
                        <span>max size of 3.1 MB</span>
                      </div>
                    </div>
                  </div>
                  <div className="create-cols">
                    <CreateForm state={state} setState={setState} />
                  </div>
                </div>
              </div>
            );
            break;
          default:
            break;
        }
      }}
    </ColsRightContext.Consumer>
  );
};
