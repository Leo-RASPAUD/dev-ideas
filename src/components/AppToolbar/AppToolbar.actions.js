import { push } from 'react-router-redux';
import { Auth } from 'aws-amplify';
import routes from 'utils/routes';

const states = {
    SIGN_OUT_LOADING: 'SIGN_OUT_LOADING',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
};

const signOutLoadingAction = () => ({ type: states.SIGN_OUT_LOADING });
const signOutSuccessAction = () => ({ type: states.SIGN_OUT_SUCCESS });
const signOutFailureAction = () => ({ type: states.SIGN_OUT_FAILURE });
const goToHomeAction = () => push(routes.home);

const signOut = () => async dispatch => {
    dispatch(signOutLoadingAction());
    try {
        await Auth.signOut();
        dispatch(signOutSuccessAction());
        dispatch(goToHomeAction());
    } catch (error) {
        dispatch(signOutFailureAction());
    }
};

const goToSettings = () => dispatch => {
    dispatch(push(routes.settings));
};

export default {
    signOut,
    goToSettings,
    states,
};
