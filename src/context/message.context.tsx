import React from "react";
import { useDispatch } from "react-redux";
import { allDispatch } from "../configureStore/extensions/dispatch";
import { Message } from "../configureStore/types/interface";
import "./static/message.scss";
import minus from "../media/icons/minus.svg";
import check from "../media/icons/check.svg";
import close from "../media/icons/close.svg";
import { Icons } from "../ref/icons";

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
                <Icons src={minus} className="icons" />
              </button>
            </div>
            <div className="message-body">{context.message}</div>
            <div className="message-type">
              <div className="box">
                {context.color ? (
                  <Icons src={check} className="icons" />
                ) : (
                  <Icons src={close} className="icons" />
                )}
              </div>
            </div>
          </div>
        );
      }}
    </MessageContext.Consumer>
  );
};
