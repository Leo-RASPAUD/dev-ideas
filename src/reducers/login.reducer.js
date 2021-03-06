import LoginActions from 'components/Login/Login.actions';
import AppActions from 'components/App/App.actions';
import AppToolbarActions from 'components/AppToolbar/AppToolbar.actions';

const initialState = {
    displayConfirmation: false,
    errorMessage: '',
    isError: false,
    user: {},
    isLoading: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginActions.states.LOGIN_CONFIRMATION_LOADING:
        case LoginActions.states.LOGIN_LOADING:
        case LoginActions.states.LOGIN_REGISTER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case LoginActions.states.CANCEL_REGISTER:
            return {
                ...state,
                displayConfirmation: false,
                isLoading: false,
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
                isLoading: false,
            };
        case LoginActions.states.LOGIN_CONFIRMATION_FAILURE:
        case LoginActions.states.LOGIN_REGISTER_FAILURE:
        case LoginActions.states.LOGIN_FAILURE:
            return {
                ...state,
                isError: true,
                errorMessage: action.error,
                isLoading: false,
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
