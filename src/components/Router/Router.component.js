import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from 'components/Home/Home.container';
import Login from 'components/Login/Login.container';

class Router extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;
        const authenticated = user.email;
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                {authenticated && <Route exact path="/home" component={Home} />}
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default Router;
