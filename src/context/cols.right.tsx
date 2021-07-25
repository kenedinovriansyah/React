import React from "react";
import { Drawer, User } from "../configureStore/types/interface";
import _ from "lodash";
import { PasswordContext, PasswordContextApp } from "./password.context";
import camera from "../media/icons/camera.svg";
import { Icons } from "../ref/icons";
import CreateForm from "./applicationForm/create.form";
import sort from "../media/icons/sort.svg";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../configureStore";
import trash from "../media/icons/searching.svg";
import edit from "../media/icons/edit.svg";
import trashs from "../media/icons/trash.svg";
import search from "../media/icons/magnifying-glass-search.svg";
import { allActions } from "../configureStore/actions/all.actions";
import { allDispatch } from "../configureStore/extensions/dispatch";

interface ContextProps {
  open: Drawer;
  click(name: string, type: string): void;
}

export interface ColsRightStateActions {
  avatar: any;
  avatar_url: any;
  destroyArray: boolean;
  array: any[];
  filter: any[];
}

export const ColsRightContext = React.createContext<Partial<ContextProps>>({});
export const ColsRightContextApp = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<ColsRightStateActions>({
    avatar: null,
    avatar_url: "",
    destroyArray: false,
    array: [],
    filter: [],
  });

  const selector = useSelector((state: ApplicationState) => state.user);
  const defaults = useSelector((state: ApplicationState) => state.default);

  React.useEffect(() => {
    if (defaults.drawer.update) {
      if (defaults.drawer.context.accounts.avatar) {
        setState({
          ...state,
          avatar_url: defaults.drawer.context.accounts.avatar,
        });
      }
    }
  }, [defaults.drawer.update]);

  const handleClick = (type: string) => {
    switch (type) {
      case "all":
        setState({
          ...state,
          destroyArray: !state.destroyArray,
          array: !state.destroyArray ? selector.data.accounts.employe : [],
        });
        break;

      default:
        break;
    }
  };

  const clickUpdateList = (args: User) => {
    allDispatch.defaultDispatch(
      dispatch,
      {
        active: 0,
        page: "user",
        child_page: "create",
        title: "Edit User",
        breadcrumbs: ["Dashboard", "User", "Edit User"],
        update: true,
        context: args,
      },
      "drawer"
    );
  };

  const clickAddOrRemove = (args: User) => {
    const filter = state.array.filter(
      (x) => x.first_name.indexOf(args.first_name) > -1
    )[0];
    let array: any[];
    if (filter) {
      array = state.array.filter(function (x: User) {
        return x.id !== filter.id;
      });
    }
    setState({
      ...state,
      array: filter ? array : [...state.array, args],
    });
  };

  const changeFiles = (args: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      avatar: args.currentTarget.files[0],
      avatar_url: URL.createObjectURL(args.currentTarget.files[0]),
    });
  };

  const changeFilter = (args: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      filter: [],
    });
    if (args.currentTarget.value.length >= 1) {
      setState({
        ...state,
        filter: selector.data.accounts.employe.filter(
          (x) =>
            x.first_name
              .toLowerCase()
              .indexOf(args.currentTarget.value.toLowerCase()) > -1
        ),
      });
    }
  };

  const clickDestroy = (id: string) => {
    dispatch(
      allActions.all({
        url: `/api/v1/user/${id}`,
        status: 200,
        method: "delete",
        json: true,
        auth: true,
        type: {
          value: id,
          name: "destroy_employe",
        },
      })
    );
  };

  const clickDestroyManyToMany = (args: React.MouseEvent<HTMLSpanElement>) => {
    args.preventDefault();
    const data = [];
    for (let i = 0; i < state.array.length; i++) {
      data.push(state.array[i].id);
    }
    dispatch(
      allActions.all({
        url: `/api/v1/user/acounts/destroy/employe/${data}`,
        status: 200,
        method: "delete",
        json: true,
        auth: true,
        type: {
          value: state.array,
          name: "destroy_employe_many",
        },
        state,
        stateActions: setState,
      })
    );
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
          case "list":
            return (
              <div className="app-list">
                <div className="headers">
                  <div className="title">
                    <h5>{open.title}</h5>
                  </div>
                  <div className="group">
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
                    <button>
                      <span>New User</span>
                    </button>
                  </div>
                </div>
                <div className="app-table">
                  <div
                    className={
                      state.array.length >= 1 ? "app-table-destroy" : "hidden"
                    }
                  >
                    <span>{state.array.length} Selected</span>
                    <span onClick={clickDestroyManyToMany}>
                      <Icons src={trashs} className="icons" />
                    </span>
                  </div>
                  <div className="groups">
                    <div className="field" id="field-input">
                      <Icons src={search} className="icons" />
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="search"
                        placeholder="Search User"
                        autoComplete="off"
                        onChange={changeFilter}
                      />
                    </div>
                    <Icons src={sort} className="icons" />
                  </div>
                  <ul className="table-title">
                    <li id="choice">
                      <div
                        className="box"
                        id={state.destroyArray ? "active" : ""}
                        onClick={handleClick.bind("", "all")}
                      >
                        {state.destroyArray ? (
                          <i className="fas fa-check"></i>
                        ) : null}
                      </div>
                    </li>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li id="gender">Gender</li>
                    <li id="phone">Phone Numbers</li>
                    <li id="type">Type</li>
                    <li id="options">Options</li>
                  </ul>
                  <div className="table-app">
                    {_.map(
                      state.filter.length >= 1
                        ? state.filter
                        : selector.data
                        ? selector.data.accounts
                          ? selector.data.accounts.employe
                          : []
                        : [],
                      (base, index) => {
                        return (
                          <ul key={index}>
                            <li id="choice">
                              <div
                                className="box"
                                id={
                                  state.array.filter(
                                    (x: User) =>
                                      x.first_name.indexOf(base.first_name) > -1
                                  )[0]
                                    ? "active"
                                    : ""
                                }
                                onClick={clickAddOrRemove.bind(base, base)}
                              >
                                {state.array.filter(
                                  (x: User) =>
                                    x.first_name.indexOf(base.first_name) > -1
                                )[0] ? (
                                  <i className="fas fa-check"></i>
                                ) : null}
                              </div>
                            </li>
                            <li className="name">
                              {base.first_name.substr(0, 20)}
                              {base.first_name.length >= 20 ? " ..." : ""}
                            </li>
                            <li className="name">
                              {base.last_name.substr(0, 20)}
                              {base.last_name.length >= 20 ? " ..." : ""}
                            </li>
                            <li id="gender">
                              {base.accounts ? base.accounts.name_gender : ""}
                            </li>
                            <li id="phone">
                              {base.accounts
                                ? base.accounts.phone.phone_numbers
                                : ""}
                            </li>
                            <li id="type">
                              {base.accounts ? base.accounts.type.name : ""}
                            </li>
                            <li id="options">
                              <div className="group">
                                <button
                                  className="box"
                                  onClick={clickUpdateList.bind(base, base)}
                                >
                                  <Icons src={edit} className="icons" />
                                </button>
                                <button
                                  className="box"
                                  onClick={clickDestroy.bind(
                                    base,
                                    base.accounts.public_id
                                  )}
                                >
                                  <Icons src={trash} className="icons" />
                                </button>
                              </div>
                            </li>
                          </ul>
                        );
                      }
                    )}
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
