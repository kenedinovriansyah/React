import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { productReducer } from './reducer/product.reducer';

const stores = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    product: productReducer,
  });

export default stores;
