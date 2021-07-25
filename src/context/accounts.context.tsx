import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../configureStore";
import { allActions } from "../configureStore/actions/all.actions";
import { allDispatch } from "../configureStore/extensions/dispatch";
import CreateForm from "./applicationForm/create.form";

export interface ContextProps {
  open: string;
}

export const AccountsContext = React.createContext<Partial<ContextProps>>({});
export const AccountsContextApp = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: ApplicationState) => state);
  const [state, setState] = React.useState({
    email: "",
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  React.useEffect(() => {
    if (selector.default.reset) {
      setState({
        ...state,
        email: "",
        old_password: "",
        password_confirmation: "",
        password: "",
      });
      allDispatch.defaultDispatch(dispatch, false, "reset");
    }
  }, [selector.default.reset]);
  const change = (args: React.ChangeEvent<HTMLInputElement>, type: string) => {
    switch (type) {
      case "email":
        setState({
          ...state,
          email: args.currentTarget.value,
        });
        break;
      case "old_password":
        setState({
          ...state,
          old_password: args.currentTarget.value,
        });
        break;
      case "password":
        setState({
          ...state,
          password: args.currentTarget.value,
        });
        break;
      case "password_confirmation":
        setState({
          ...state,
          password_confirmation: args.currentTarget.value,
        });
        break;
      default:
        break;
    }
  };
  const submit = (args: React.FormEvent<HTMLFormElement>) => {
    args.preventDefault();
    let types: string, data: any;
    if (state.email) {
      data = {
        email: state.email,
        password: state.password,
        types: "email",
      };
    } else {
      data = {
        old_password: state.old_password,
        password: state.password,
        password_confirmation: state.password_confirmation,
        types: "password",
      };
    }

    allDispatch.defaultDispatch(
      dispatch,
      { loading: true, message: "", valid: 0, color: 0 },
      "message"
    );
    dispatch(
      allActions.all({
        url: "/api/v1/user/updated/accounts/",
        method: "post",
        json: true,
        auth: true,
        status: 200,
        data: data,
      })
    );
  };
  return (
    <AccountsContext.Consumer>
      {({ open }) => {
        switch (open) {
          case "general":
            return <CreateForm />;
            break;
          case "password":
            return (
              <div className={open === "password" ? "transition" : "hidden"}>
                <form onSubmit={submit} className="app-form">
                  <div className="field" id="field-input">
                    <input
                      type="password"
                      name="old_password"
                      id="old_password"
                      className="old_password"
                      placeholder="Old Password"
                      autoComplete="off"
                      readOnly={selector.default.message.loading}
                      value={state.old_password}
                      onChange={(args) => change(args, "old_password")}
                    />
                  </div>
                  <div className="field" id="field-input">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="password"
                      placeholder="Password"
                      autoComplete="off"
                      readOnly={selector.default.message.loading}
                      value={state.password}
                      onChange={(args) => change(args, "password")}
                    />
                  </div>
                  <div className="field" id="field-input">
                    <input
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      className="password_confirmation"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      readOnly={selector.default.message.loading}
                      value={state.password_confirmation}
                      onChange={(args) => change(args, "password_confirmation")}
                    />
                  </div>
                  <div className="field" id="field-button">
                    <button
                      type={
                        selector.default.message.loading ? "button" : "submit"
                      }
                      id={selector.default.message.loading ? "loading" : ""}
                    >
                      <span>Save Changes</span>
                      {selector.default.message.loading ? (
                        <div className="spin"></div>
                      ) : null}
                    </button>
                  </div>
                </form>
              </div>
            );
            break;
          case "email":
            return (
              <div className={open === "email" ? "transition-email" : "hidden"}>
                <form onSubmit={submit} className="app-form">
                  <div className="field" id="field-input">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="email"
                      placeholder="Email"
                      autoComplete="off"
                      readOnly={selector.default.message.loading}
                      value={state.email}
                      onChange={(args) => change(args, "email")}
                    />
                  </div>
                  <div className="field" id="field-input">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="password"
                      placeholder="Password"
                      autoComplete="off"
                      readOnly={selector.default.message.loading}
                      value={state.password}
                      onChange={(args) => change(args, "password")}
                    />
                  </div>
                  <div className="field" id="field-button">
                    <button
                      type={
                        selector.default.message.loading ? "button" : "submit"
                      }
                      id={selector.default.message.loading ? "loading" : ""}
                    >
                      <span>Save Changes</span>
                      {selector.default.message.loading ? (
                        <div className="spin"></div>
                      ) : null}
                    </button>
                  </div>
                </form>
              </div>
            );
          default:
            break;
        }
      }}
    </AccountsContext.Consumer>
  );
};
