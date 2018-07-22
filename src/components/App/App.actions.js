import httpUtils from 'utils/http.utils';
import lamdbaUtils from 'utils/lamdba.utils';

const states = {
    CHECK_SESSION_LOADING: 'CHECK_SESSION_LOADING',
    CHECK_SESSION_SUCCESS: 'CHECK_SESSION_SUCCESS',
    CHECK_SESSION_FAILURE: 'CHECK_SESSION_FAILURE',
};

const checkSessionLoadingAction = () => ({ type: states.CHECK_SESSION_LOADING });
const checkSessionSuccessAction = ({ user }) => ({ type: states.CHECK_SESSION_SUCCESS, user });
const checkSessionFailureAction = () => ({ type: states.CHECK_SESSION_FAILURE });

const checkSession = () => async dispatch => {
    const { localStorage } = window;
    const tokens = ['idToken', 'refreshToken', 'accessToken', 'username'];
    const [idToken, refreshToken, accessToken, username] = tokens.map(token =>
        localStorage.getItem(token),
    );

    if (idToken && refreshToken && accessToken && username) {
        dispatch(checkSessionLoadingAction());
        try {
            const result = await httpUtils.post({
                url: lamdbaUtils.checkSession,
                params: { idToken, refreshToken, accessToken, username },
            });
            if (result.data.isSessionValid) {
                dispatch(checkSessionSuccessAction({ user: { email: result.data.user.username } }));
            } else {
                localStorage.clear();
                dispatch(checkSessionSuccessAction({ user: {} }));
            }
        } catch (error) {
            localStorage.clear();
            dispatch(checkSessionFailureAction({ error: error.response.data.message }));
        }
    } else {
        localStorage.clear();
        dispatch(checkSessionSuccessAction({ user: {} }));
    }
};

export default {
    checkSession,
    states,
};
