import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import stores from '..';
import { createBrowserHistory } from 'history';
import { ProductState } from '../types/interface';

export const history = createBrowserHistory();

export interface ApplicationState {
  product: ProductState;
}

export default function configureStore(preloadedState?: any) {
  const middleware = [thunkMiddleware];
  const store: Store<ApplicationState> = createStore(
    stores(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        ...middleware,
        loggerMiddleware,
        routerMiddleware(history)
      )
    )
  );
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(stores(history));
    });
  }
  return store;
}
