import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from '../screen/home.screen';
import LoginScreen from '../screen/login.screen';
import LoadingScreen from '../screen/loading.screen';
import NavbarComponent from '../component/navbar.component';
import ResetScreen from '../screen/reset.screen';
import { DrawerContext, DrawerContextApp } from '../context/drawer.context';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../configureStore';
import { MessageContext, MessageContextApp } from '../context/message.context';
import ApplicationScreen from '../screen/application.screen';
import { allDispatch } from '../configureStore/extensions/dispatch';

export const Routes = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: ApplicationState) => state.default);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      allDispatch.defaultDispatch(
        dispatch,
        localStorage.getItem('token'),
        'token'
      );
    }
  }, [localStorage.getItem('token')]);

  return (
    <div>
      <NavbarComponent />
      <Switch>{state.token ? <PrivateRoute /> : <PublicRoute />}</Switch>
      {/* Context */}
      <DrawerContext.Provider
        value={{
          open: state.drawer.active,
        }}
      >
        <DrawerContextApp />
      </DrawerContext.Provider>
      <MessageContext.Provider
        value={{
          context: state.message,
        }}
      >
        <MessageContextApp />
      </MessageContext.Provider>
    </div>
  );
};

const PublicRoute = () => {
  return (
    <>
      <Route path="/" component={HomeScreen} exact={true} />
      <Route path="/access-login" component={LoginScreen} />
      <Route path="/loading/:name" component={LoadingScreen} />
      <Route path="/access-reset-accounts" component={ResetScreen} />
    </>
  );
};

const PrivateRoute = () => {
  return (
    <>
      <Route path="/" component={ApplicationScreen} />
    </>
  );
};
