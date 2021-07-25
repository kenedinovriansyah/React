import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { DefaultTypes, UserTypes } from "../types/enum";

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
  public validatorErrorAuth(context: Message, err: any) {
    if (err.response.data.detail) {
      localStorage.clear();
      window.location.reload();
    }
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
      case "drawer":
        console.log(args);
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
      case "reset":
        dispatch({
          type: DefaultTypes.reset,
          payload: {
            reset: args,
          },
        });
        break;
      case "token":
        dispatch({
          type: DefaultTypes.token,
          payload: {
            token: args,
          },
        });
        break;
      default:
        break;
    }
  }

  public userdispatch(
    dispatch: Dispatch,
    res: AxiosResponse<any>,
    type: string
  ) {
    switch (type) {
      case "me":
        dispatch({
          type: UserTypes.me,
          payload: {
            data: res.data,
          },
        });
        break;
      case "default":
        dispatch({
          type: DefaultTypes.free_json,
          payload: {
            default: res.data,
          },
        });
        break;
      default:
        break;
    }
  }
}

export const allDispatch = new AllDispatch();
