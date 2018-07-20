import { push } from 'react-router-redux';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import cognitoConfig from 'utils/cognito.config';

const { cognitoPoolData } = cognitoConfig;

const states = {
    LOGIN_REGISTER_SUCCESS: 'LOGIN_REGISTER_SUCCESS',
    LOGIN_REGISTER_FAILURE: 'LOGIN_REGISTER_FAILURE',
    LOGIN_CONFIRMATION_SUCCESS: 'LOGIN_CONFIRMATION_SUCCESS',
    LOGIN_CONFIRMATION_FAILURE: 'LOGIN_CONFIRMATION_FAILURE',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};

const dispatchRegisterSuccess = ({ email }) => ({ type: states.LOGIN_REGISTER_SUCCESS, email });
const dispatchRegisterFailure = ({ error }) => ({ type: states.LOGIN_REGISTER_FAILURE, error });
const dispatchConfirmSuccess = () => ({ type: states.LOGIN_CONFIRMATION_SUCCESS });
const dispatchConfirmFailure = ({ error }) => ({ type: states.LOGIN_CONFIRMATION_FAILURE, error });
const dispatchLoginSuccess = ({ email }) => ({ type: states.LOGIN_SUCCESS, email });
const dispatchLoginFailure = ({ error }) => ({ type: states.LOGIN_FAILURE, error });
const goToHome = () => push('/home');

const registerUser = user => dispatch => {
    const { email, password } = user;
    const userPool = new CognitoUserPool(cognitoPoolData);

    const attributeList = [];

    const dataEmail = {
        Name: 'email',
        Value: email,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(email, password, attributeList, null, err => {
        if (err) {
            dispatch(dispatchRegisterFailure({ error: err.message }));
            return;
        }
        dispatch(dispatchRegisterSuccess({ email }));
    });
};

const confirmUser = ({ confirmationCode, email }) => dispatch => {
    const userPool = new CognitoUserPool(cognitoPoolData);
    const userData = {
        Username: email,
        Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(confirmationCode, true, err => {
        if (err) {
            dispatch(dispatchConfirmFailure({ error: err.message }));
            return;
        }
        dispatch(dispatchConfirmSuccess());
        dispatch(goToHome());
    });
};

const login = ({ email, password }) => dispatch => {
    const authenticationData = {
        Username: email,
        Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPool = new CognitoUserPool(cognitoPoolData);
    const userData = {
        Username: email,
        Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess() {
            dispatch(dispatchLoginSuccess({ email }));
            dispatch(goToHome());
        },
        onFailure(error) {
            dispatch(dispatchLoginFailure({ email, error: error.message }));
        },
    });
};

export default {
    registerUser,
    confirmUser,
    login,
    states,
};
