import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login.component';
import actions from './Login.actions';

const mapStateToProps = state => ({
    displayConfirmation: state.login.displayConfirmation,
    isError: state.login.isError,
    errorMessage: state.login.errorMessage,
    isLoading: state.login.isLoading,
});

const mapDispatchToProps = dispatch => ({
    registerUser: user => dispatch(actions.registerUser(user)),
    login: credentials => dispatch(actions.login(credentials)),
    cancelRegister: () => dispatch(actions.cancelRegister()),
    validateCode: ({ confirmationCode, email, password }) =>
        dispatch(actions.validateCode({ confirmationCode, email, password })),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Login),
);
