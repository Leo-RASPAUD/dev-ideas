import LoadingBar from 'react-redux-loading-bar';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, CircularProgress, Snackbar } from '@material-ui/core';
import AppToolbar from 'components/AppToolbar/AppToolbar.container';
import Router from 'components/Router/Router.container';
import SnackbarError from '../SnackbarError/SnackbarError.component';

import styles from './App.styles';

@withStyles(styles)
class App extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isAppInitializing: PropTypes.bool.isRequired,
        checkSession: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired,
        error: PropTypes.string,
    };

    static defaultProps = {
        error: '',
    };

    componentDidMount = () => {
        const { checkSession } = this.props;
        checkSession();
    };

    closeSnackbar = () => {
        const { clearError } = this.props;
        clearError();
    };

    render() {
        const { classes, isAppInitializing, error } = this.props;

        return (
            <div className={classes.root}>
                <Snackbar
                    className={classes.snackbarError}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={error.length > 0}
                    autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                >
                    <SnackbarError message={error} />
                </Snackbar>
                {isAppInitializing && (
                    <div className={classes.progressWrapper}>
                        <CircularProgress
                            className={classes.progress}
                            color="secondary"
                            size={50}
                        />
                    </div>
                )}
                {!isAppInitializing && (
                    <Fragment>
                        <AppBar position="static">
                            <AppToolbar />
                        </AppBar>
                        <LoadingBar className={classes.loadingBar} />
                        <Router />
                    </Fragment>
                )}
            </div>
        );
    }
}

export default App;
