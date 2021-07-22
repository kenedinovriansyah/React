import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../configureStore";
import { allActions } from "../configureStore/actions/all.actions";
import { allDispatch } from "../configureStore/extensions/dispatch";
import "./static/login.scss";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: ApplicationState) => state.default);
  const [state, setState] = React.useState({ username: "", password: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    switch (type) {
      case "username":
        setState({
          ...state,
          username: e.currentTarget.value,
        });
        break;
      case "password":
        setState({
          ...state,
          password: e.currentTarget.value,
        });
        break;
      default:
        break;
    }
  };

  const onsubmit = (args: React.FormEvent<HTMLFormElement>) => {
    args.preventDefault();
    allDispatch.defaultDispatch(
      dispatch,
      {
        message: "",
        valid: 0,
        color: 0,
        loading: true,
      },
      "message"
    );
    dispatch(
      allActions.all({
        url: "/api-token-auth/",
        data: state,
        status: 200,
        json: true,
        auth: false,
        method: "post",
      })
    );
  };

  return (
    <div className="auth">
      <form onSubmit={onsubmit}>
        <div className="field" id="field-title">
          <h4>Sign in to</h4>
          <h6>K-circle</h6>
        </div>
        <div className="field" id="field-vertical">
          <label htmlFor="">Username</label>
          <div id="field-input">
            <input
              type="text"
              name="username"
              id="username"
              className="username"
              placeholder="Username"
              autoComplete="off"
              value={state.username}
              onChange={(args) => onChange(args, "username")}
            />
          </div>
        </div>
        <div className="field" id="field-vertical">
          <label htmlFor="">Password</label>
          <div id="field-input">
            <input
              type="password"
              name="password"
              id="password"
              className="password"
              placeholder="Password"
              value={state.password}
              onChange={(args) => onChange(args, "password")}
            />
          </div>
        </div>
        <div className="field" id="field-button">
          <button
            type={selector.message.loading ? "button" : "submit"}
            id={selector.message.loading ? "loading" : ""}
          >
            <span>Sign in</span>
            {selector.message.loading ? <div className="spin"></div> : null}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
