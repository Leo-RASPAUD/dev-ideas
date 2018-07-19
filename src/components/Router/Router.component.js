import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from 'components/Home/Home.container';

const Router = () => (
    <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect to="/home" />
    </Switch>
);
export default Router;
