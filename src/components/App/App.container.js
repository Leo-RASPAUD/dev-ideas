import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App.component';
import actions from './App.actions';

const mapStateToProps = state => ({
    isAppInitializing: state.app.isAppInitializing,
    error: state.app.error,
});

const mapDispatchToProps = dispatch => ({
    checkSession: () => dispatch(actions.checkSession()),
    clearError: () => dispatch(actions.clearError()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(App),
);
