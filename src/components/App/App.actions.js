import { Auth } from 'aws-amplify';

const states = {
    CHECK_SESSION_LOADING: 'CHECK_SESSION_LOADING',
    CHECK_SESSION_SUCCESS: 'CHECK_SESSION_SUCCESS',
    CHECK_SESSION_FAILURE: 'CHECK_SESSION_FAILURE',
};

const checkSessionLoadingAction = () => ({ type: states.CHECK_SESSION_LOADING });
const checkSessionSuccessAction = ({ isAuthenticated, user }) => ({
    type: states.CHECK_SESSION_SUCCESS,
    isAuthenticated,
    user,
});
const checkSessionFailureAction = ({ isAuthenticated }) => ({
    type: states.CHECK_SESSION_FAILURE,
    isAuthenticated,
});

const checkSession = () => async dispatch => {
    dispatch(checkSessionLoadingAction());
    try {
        const user = await Auth.currentAuthenticatedUser();
        dispatch(
            checkSessionSuccessAction({ isAuthenticated: true, user: { ...user.attributes } }),
        );
    } catch (error) {
        dispatch(checkSessionFailureAction({ error, isAuthenticated: false }));
    }
};

export default {
    checkSession,
    states,
};
