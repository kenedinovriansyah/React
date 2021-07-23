import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { defaultReducer } from "../reducer/default.reducer";
import { userReducer } from "../reducer/user.reducer";

const stores = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    default: defaultReducer,
    user: userReducer,
  });

export default stores;
