import { push } from 'react-router-redux';
import httpUtils from 'utils/http.utils';
import lamdbaUtils from 'utils/lamdba.utils';

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
const registerSuccessAction = ({ email }) => ({ type: states.LOGIN_REGISTER_SUCCESS, email });
const registerFailureAction = ({ error }) => ({ type: states.LOGIN_REGISTER_FAILURE, error });

const confirmLoading = () => ({ type: states.LOGIN_CONFIRMATION_LOADING });
const confirmSuccessAction = () => ({ type: states.LOGIN_CONFIRMATION_SUCCESS });
const confirmFailureAction = ({ error }) => ({ type: states.LOGIN_CONFIRMATION_FAILURE, error });

const loginLoading = () => ({ type: states.LOGIN_LOADING });
const loginSuccessAction = ({ email }) => ({ type: states.LOGIN_SUCCESS, email });
const loginFailureAction = ({ error }) => ({ type: states.LOGIN_FAILURE, error });

const goToHomeAction = () => push('/home');
const cancelRegisterAction = () => ({ type: states.CANCEL_REGISTER });

const registerUser = ({ email, password }) => async dispatch => {
    dispatch(registerLoading());
    try {
        await httpUtils.post({
            url: lamdbaUtils.register,
            params: { email, password },
        });
        dispatch(registerSuccessAction({ email }));
    } catch (error) {
        dispatch(registerFailureAction({ error: error.response.data.message }));
    }
};

const validateCode = ({ confirmationCode, email }) => async dispatch => {
    dispatch(confirmLoading());
    try {
        await httpUtils.post({
            url: lamdbaUtils.validateCode,
            params: { confirmationCode, email },
        });
        dispatch(confirmSuccessAction());
        dispatch(goToHomeAction());
    } catch (error) {
        dispatch(confirmFailureAction({ error: error.message }));
    }
};

const login = ({ email, password }) => async dispatch => {
    dispatch(loginLoading());
    try {
        await httpUtils.post({
            url: lamdbaUtils.login,
            params: { email, password },
        });
        dispatch(loginSuccessAction({ email }));
        dispatch(goToHomeAction());
    } catch (error) {
        dispatch(loginFailureAction({ email, error: error.message }));
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
