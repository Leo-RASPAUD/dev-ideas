import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppToolbar from './AppToolbar.component';
import actions from './AppToolbar.actions';

const mapStateToProps = state => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(actions.signOut()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AppToolbar),
);
