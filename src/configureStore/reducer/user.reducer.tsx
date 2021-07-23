import { Reducer } from "redux";
import { UserTypes } from "../types/enum";
import { UserState } from "../types/interface";

const initialState: UserState = {
  user: [],
  data: {},
};

export const userReducer: Reducer<UserState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserTypes.me:
      return {
        ...state,
        data: action.payload.data,
      };
      break;

    default:
      return state;
      break;
  }
};
