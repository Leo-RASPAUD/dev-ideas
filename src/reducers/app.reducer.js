import AppActions from 'components/App/App.actions';
import LoginActions from 'components/Login/Login.actions';
import AppToolbarActions from 'components/AppToolbar/AppToolbar.actions';

const initialState = {
    isAppInitializing: true,
    isAuthenticated: false,
    error: '',
};

const appReducer = (state = initialState, action) => {
    if (action.type.match(/FAILURE/)) {
        return {
            ...state,
            error: action.error,
        };
    }
    switch (action.type) {
        case AppActions.states.CLEAR_ERROR:
            return {
                ...state,
                error: '',
            };
        case AppActions.states.CHECK_SESSION_SUCCESS:
        case AppActions.states.CHECK_SESSION_FAILURE:
            return {
                ...state,
                isAppInitializing: false,
                isAuthenticated: action.isAuthenticated,
            };
        case AppActions.states.CHECK_SESSION_LOADING:
            return {
                ...state,
                isAppInitializing: true,
            };
        case LoginActions.states.LOGIN_CONFIRMATION_SUCCESS:
        case LoginActions.states.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case AppToolbarActions.states.SIGN_OUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default appReducer;
