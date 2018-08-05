import { push } from 'react-router-redux';
import { Auth } from 'aws-amplify';
import routes from 'utils/routes';
import slack from 'utils/slack';

const states = {
    LOGIN_REGISTER_LOADING: 'LOGIN_REGISTER_LOADING',
    LOGIN_REGISTER_SUCCESS: 'LOGIN_REGISTER_SUCCESS',
    LOGIN_REGISTER_FAILURE: 'LOGIN_REGISTER_FAILURE',
    LOGIN_CONFIRMATION_LOADING: 'LOGIN_CONFIRMATION_LOADING',
    LOGIN_CONFIRMATION_SUCCESS: 'LOGIN_CONFIRMATION_SUCCESS',
    LOGIN_CONFIRMATION_FAILURE: 'LOGIN_CONFIRMATION_FAILURE',
    LOGIN_LOADING: 'LOGIN_LOADING',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    CANCEL_REGISTER: 'CANCEL_REGISTER',
};

const registerLoading = () => ({ type: states.LOGIN_REGISTER_LOADING });
const registerSuccessAction = ({ user }) => ({ type: states.LOGIN_REGISTER_SUCCESS, user });
const registerFailureAction = ({ error }) => ({ type: states.LOGIN_REGISTER_FAILURE, error });

const confirmLoading = () => ({ type: states.LOGIN_CONFIRMATION_LOADING });
const confirmSuccessAction = ({ user }) => ({ type: states.LOGIN_CONFIRMATION_SUCCESS, user });
const confirmFailureAction = ({ error }) => ({ type: states.LOGIN_CONFIRMATION_FAILURE, error });

const loginLoading = () => ({ type: states.LOGIN_LOADING });
const loginSuccessAction = ({ user }) => ({ type: states.LOGIN_SUCCESS, user });
const loginFailureAction = ({ error }) => ({ type: states.LOGIN_FAILURE, error });

const goToHomeAction = () => push(routes.home);
const cancelRegisterAction = () => ({ type: states.CANCEL_REGISTER });

const registerUser = ({ email, password }) => async dispatch => {
    dispatch(registerLoading());
    try {
        await Auth.signUp({
            username: email,
            password,
        });
        await slack.post({
            message: 'New user registered',
            fields: [
                {
                    title: 'Username',
                    value: email,
                },
            ],
        });
        dispatch(registerSuccessAction({ user: {} }));
    } catch (error) {
        dispatch(registerFailureAction({ error: error.message }));
    }
};

const validateCode = ({ confirmationCode, email, password }) => async dispatch => {
    dispatch(confirmLoading());
    try {
        await Auth.confirmSignUp(email, confirmationCode);
        await Auth.signIn(email, password);
        const currentUser = await Auth.currentAuthenticatedUser();
        dispatch(confirmSuccessAction({ user: { ...currentUser.attributes } }));
        return dispatch(goToHomeAction());
    } catch (error) {
        return dispatch(confirmFailureAction({ error: error.message }));
    }
};

const login = ({ email, password }) => async dispatch => {
    dispatch(loginLoading());
    try {
        await Auth.signIn(email, password);
        const user = await Auth.currentAuthenticatedUser();
        await slack.post({
            message: 'New user logged in',
            fields: [
                {
                    title: 'Username',
                    value: email,
                },
            ],
        });
        dispatch(loginSuccessAction({ user: { ...user.attributes } }));
        dispatch(goToHomeAction());
    } catch (error) {
        dispatch(loginFailureAction({ error: error.message || error }));
    }
};

const cancelRegister = () => dispatch => {
    dispatch(cancelRegisterAction());
};

export default {
    registerUser,
    validateCode,
    cancelRegister,
    login,
    states,
};
