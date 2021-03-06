import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App.component';
import actions from './App.actions';

const mapStateToProps = state => ({
    isAppInitializing: state.app.isAppInitializing,
});

const mapDispatchToProps = dispatch => ({
    checkSession: () => dispatch(actions.checkSession()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(App),
);
