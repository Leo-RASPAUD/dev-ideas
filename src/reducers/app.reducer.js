import AppActions from 'components/App/App.actions';
import LoginActions from 'components/Login/Login.actions';
import AppToolbarActions from 'components/AppToolbar/AppToolbar.actions';

const initialState = {
    isAppInitializing: true,
    isAuthenticated: false,
    error: '',
};

const appReducer = (state = initialState, action) => {
    let newState = { ...state };
    if (action.type !== AppActions.states.CHECK_SESSION_FAILURE && action.type.match(/FAILURE/)) {
        newState = {
            ...state,
            error: action.error,
        };
    }
    switch (action.type) {
        case AppActions.states.CLEAR_ERROR:
            return {
                ...newState,
                error: '',
            };
        case AppActions.states.CHECK_SESSION_SUCCESS:
        case AppActions.states.CHECK_SESSION_FAILURE:
            return {
                ...newState,
                isAppInitializing: false,
                isAuthenticated: action.isAuthenticated,
                error: action.error,
            };
        case AppActions.states.CHECK_SESSION_LOADING:
            return {
                ...newState,
                isAppInitializing: true,
            };
        case LoginActions.states.LOGIN_CONFIRMATION_SUCCESS:
        case LoginActions.states.LOGIN_SUCCESS:
            return {
                ...newState,
                isAuthenticated: true,
            };
        case AppToolbarActions.states.SIGN_OUT_SUCCESS:
            return {
                ...newState,
                isAuthenticated: false,
            };
        default:
            return newState;
    }
};

export default appReducer;
