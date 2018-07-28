import { Auth } from 'aws-amplify';
import slack from 'utils/slack';

const states = {
    CHECK_SESSION_LOADING: 'CHECK_SESSION_LOADING',
    CHECK_SESSION_SUCCESS: 'CHECK_SESSION_SUCCESS',
    CHECK_SESSION_FAILURE: 'CHECK_SESSION_FAILURE',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

const clearErrorAction = () => ({ type: states.CLEAR_ERROR });
const checkSessionLoadingAction = () => ({ type: states.CHECK_SESSION_LOADING });
const checkSessionSuccessAction = ({ isAuthenticated, user }) => ({
    type: states.CHECK_SESSION_SUCCESS,
    isAuthenticated,
    user,
});
const checkSessionFailureAction = ({ isAuthenticated, error }) => ({
    type: states.CHECK_SESSION_FAILURE,
    isAuthenticated,
    error,
});

const checkSession = () => async dispatch => {
    dispatch(checkSessionLoadingAction());
    try {
        const user = await Auth.currentAuthenticatedUser();
        await slack.post({
            message: 'User logged back in',
            fields: [
                {
                    title: 'Username',
                    value: user.attributes.email,
                },
            ],
        });
        dispatch(
            checkSessionSuccessAction({ isAuthenticated: true, user: { ...user.attributes } }),
        );
    } catch (error) {
        dispatch(checkSessionFailureAction({ error, isAuthenticated: false }));
    }
};

const clearError = () => dispatch => {
    dispatch(clearErrorAction());
};

export default {
    checkSession,
    clearError,
    states,
};
