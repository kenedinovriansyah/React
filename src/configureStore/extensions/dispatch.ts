import { Dispatch } from "redux";
import { DefaultTypes } from "../types/enum";

interface Message {
  non_field_errors: any[];
  message: string;
}

class AllDispatch {
  constructor() {}

  public validatorSuccess(context: Message) {
    if (context.message) {
      return context.message;
    }
  }
  public validatorErrorAuth(context: Message) {
    localStorage.clear();
    window.location.reload();
    if (context.message) {
      return context.message;
    } else if (context.non_field_errors) {
      return context.non_field_errors[0];
    }
  }

  public validatorError(context: Message) {
    if (context.message) {
      return context.message;
    } else if (context.non_field_errors) {
      return context.non_field_errors[0];
    }
  }

  public defaultDispatch(dispatch: Dispatch, args: any, type: string) {
    switch (type) {
      case "draewr":
        dispatch({
          type: DefaultTypes.drawer,
          payload: {
            drawer: args,
          },
        });
        break;
      case "hidden":
        dispatch({
          type: DefaultTypes.hidden,
          payload: {
            hidden: args,
          },
        });
        break;
      case "loading":
        dispatch({
          type: DefaultTypes.loading,
          payload: {
            loading: args,
          },
        });
        break;
      case "message":
        dispatch({
          type: DefaultTypes.message,
          payload: {
            message: args.message,
            loading: args.loading,
            valid: args.valid,
            color: args.color,
          },
        });
        break;
      default:
        break;
    }
  }
}

export const allDispatch = new AllDispatch();
