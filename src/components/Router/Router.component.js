import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from 'components/Home/Home.container';
import Login from 'components/Login/Login.container';
import Settings from 'components/Settings/Settings.container';
import routes from 'utils/routes';

const unauthenticatedRoutes = <Route exact path={routes.login} component={Login} />;

class Router extends React.PureComponent {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
    };

    authenticatedRoutes = () => {
        const {
            location: { pathname },
        } = this.props;
        if (pathname === routes.login) {
            return <Redirect from={routes.login} to={routes.home} />;
        }
        return (
            <Fragment>
                <Route exact path={routes.home} component={Home} />
                <Route exact path={routes.settings} component={Settings} />
            </Fragment>
        );
    };

    render() {
        const { isAuthenticated } = this.props;
        return (
            <Switch>
                {!isAuthenticated && unauthenticatedRoutes}
                {isAuthenticated && this.authenticatedRoutes()}
                <Redirect to={routes.login} />
            </Switch>
        );
    }
}

export default Router;
