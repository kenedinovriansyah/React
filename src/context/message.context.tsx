import React from "react";
import { useDispatch } from "react-redux";
import { allDispatch } from "../configureStore/extensions/dispatch";
import { Message } from "../configureStore/types/interface";
import "./static/message.scss";

interface ContextProps {
  context: Message;
}

export const MessageContext = React.createContext<Partial<ContextProps>>({});
export const MessageContextApp = () => {
  const dispatch = useDispatch();
  const click = (message: string, color: number) => {
    allDispatch.defaultDispatch(
      dispatch,
      {
        message: message,
        valid: 2,
        color: color,
        loading: false,
      },
      "message"
    );
  };
  return (
    <MessageContext.Consumer>
      {({ context }) => {
        return (
          <div
            className={
              context.valid === 1
                ? "message"
                : context.valid === 2
                ? "message-close"
                : "hidden"
            }
          >
            <div className="message-exit">
              <button onClick={click.bind("", context.message, context.color)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="message-body">{context.message}</div>
            <div className="message-type">
              <div className="box">
                <i className="fas fa-times"></i>
              </div>
            </div>
          </div>
        );
      }}
    </MessageContext.Consumer>
  );
};
