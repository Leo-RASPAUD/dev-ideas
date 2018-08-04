import AppActions from 'components/App/App.actions';
import LoginActions from 'components/Login/Login.actions';
import snackbarTypes from 'utils/snackbarTypes';
import AppToolbarActions from 'components/AppToolbar/AppToolbar.actions';
import SnackbarActions from 'components/Snackbar/Snackbar.actions';

const initialState = {
    isAppInitializing: true,
    isAuthenticated: false,
    isSnackbarDisplayed: false,
    snackbarMessage: '',
    snackbarType: snackbarTypes.INFO,
    snackbarDuration: 5000,
};

const appReducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type !== AppActions.states.CHECK_SESSION_FAILURE && action.type.match(/FAILURE/)) {
        newState.snackbarMessage = action.error;
        newState.isSnackbarDisplayed = true;
        newState.snackbarType = snackbarTypes.ERROR;
    }
    switch (action.type) {
        case SnackbarActions.states.REQUEST_SHOW_SNACKBAR:
        case SnackbarActions.states.CLOSE_SNACKBAR:
            return {
                ...newState,
                isSnackbarDisplayed: action.isSnackbarDisplayed,
                snackbarMessage: action.snackbarMessage,
                snackbarType: action.snackbarType,
                snackbarDuration: action.snackbarDuration || state.snackbarDuration,
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
