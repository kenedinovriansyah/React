import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from '../screen/home';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={HomeScreen} exact={true} />
    </Switch>
  );
};

export default Routes;
