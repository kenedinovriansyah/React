import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "../screen/home.screen";
import LoginScreen from "../screen/login.screen";
import LoadingScreen from "../screen/loading.screen";
import NavbarComponent from "../component/navbar.component";
import { DrawerContext, DrawerContextApp } from "../context/drawer.context";
import { useSelector } from "react-redux";
import { ApplicationState } from "../configureStore";
import { MessageContext, MessageContextApp } from "../context/message.context";

export const Routes = () => {
  const state = useSelector((state: ApplicationState) => state.default);
  return (
    <div>
      <NavbarComponent />
      <Switch>
        <Route path="/" component={HomeScreen} exact={true} />
        <Route path="/access-login" component={LoginScreen} />
        <Route path="/loading/:name" component={LoadingScreen} />
      </Switch>
      {/* Context */}
      <DrawerContext.Provider
        value={{
          open: state.drawer,
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
