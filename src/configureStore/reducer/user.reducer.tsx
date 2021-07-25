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
    case UserTypes.destroy_employe:
      const data = state.data.accounts.employe.filter(function (x) {
        return x.accounts.public_id != action.payload.data;
      });
      state.data.accounts.employe = data;
      return {
        ...state,
      };
      break;
    case UserTypes.destroy_employe_many:
      for (let i = 0; i < action.payload.data.length; i++) {
        state.data.accounts.employe = state.data.accounts.employe.filter(
          function (x) {
            return x.id !== action.payload.data[i].id;
          }
        );
      }
      return {
        ...state,
      };
      break;
    case UserTypes.update_employe:
      state.data.accounts.employe = state.data.accounts.employe.map((x) =>
        x.accounts.public_id === action.payload.data.accounts.public_id
          ? action.payload.data
          : x
      );
      return {
        ...state,
      };
      break;
    default:
      return state;
      break;
  }
};
