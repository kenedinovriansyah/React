import { Reducer } from "redux";
import { DefaultTypes } from "../types/enum";
import { DefaultState } from "../types/interface";

const initialState: DefaultState = {
  hidden: false,
  loading: false,
  drawer: 0,
  message: {
    message: "",
    loading: false,
    color: 0,
    valid: 0,
  },
};

export const defaultReducer: Reducer<DefaultState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DefaultTypes.hidden:
      return {
        ...state,
        hidden: action.payload.hidden,
      };
      break;
    case DefaultTypes.loading:
      return {
        ...state,
        loading: action.payload.loading,
      };
      break;
    case DefaultTypes.drawer:
      return {
        ...state,
        drawer: action.payload.drawer,
      };
      break;
    case DefaultTypes.message:
      return {
        ...state,
        message: {
          message: action.payload.message,
          loading: action.payload.loading,
          valid: action.payload.valid,
          color: action.payload.color,
        },
      };
      break;
    default:
      return state;

      break;
  }
};
