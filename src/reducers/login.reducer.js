import LoginActions from 'components/Login/Login.actions';
import AppActions from 'components/App/App.actions';
import AppToolbarActions from 'components/AppToolbar/AppToolbar.actions';

const initialState = {
    displayConfirmation: false,
    errorMessage: '',
    isError: false,
    user: {},
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginActions.states.CANCEL_REGISTER:
            return {
                ...state,
                displayConfirmation: false,
            };
        case LoginActions.states.LOGIN_REGISTER_SUCCESS:
        case LoginActions.states.LOGIN_SUCCESS:
        case LoginActions.states.LOGIN_CONFIRMATION_SUCCESS:
            return {
                ...state,
                isError: false,
                errorMessage: '',
                displayConfirmation: action.type === LoginActions.states.LOGIN_REGISTER_SUCCESS,
                user: action.user,
            };
        case LoginActions.states.LOGIN_CONFIRMATION_FAILURE:
        case LoginActions.states.LOGIN_REGISTER_FAILURE:
        case LoginActions.states.LOGIN_FAILURE:
            return {
                ...state,
                isError: true,
                errorMessage: action.error,
            };
        case AppActions.states.CHECK_SESSION_SUCCESS:
            return {
                ...state,
                user: action.user,
            };
        case AppToolbarActions.states.SIGN_OUT_SUCCESS:
            return {
                ...state,
                user: {},
            };
        default:
            return state;
    }
};

export default appReducer;
