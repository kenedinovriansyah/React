import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import Routes from './routes';
import './static/kenedi.min.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
