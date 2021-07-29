import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import stores from './store';
import { createBrowserHistory } from 'history';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { DefaultState, ProductState, UserState } from './types/interface';

export const history = createBrowserHistory();

export interface ApplicationState {
  router: RouterState;
  default: DefaultState;
  user: UserState;
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
