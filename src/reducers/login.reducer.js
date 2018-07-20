import LoginActions from 'components/Login/Login.actions';

const initialState = {
    displayConfirmation: false,
    errorMessage: '',
    isError: false,
    user: {},
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginActions.states.LOGIN_REGISTER_SUCCESS:
        case LoginActions.states.LOGIN_SUCCESS:
            return {
                ...state,
                isError: false,
                errorMessage: '',
                displayConfirmation: action === LoginActions.states.LOGIN_REGISTER_SUCCESS,
                user: {
                    ...state.user,
                    email: action.email,
                },
            };
        case LoginActions.states.LOGIN_CONFIRMATION_SUCCESS:
            return {
                ...state,
                isError: false,
                errorMessage: '',
                displayConfirmation: false,
            };
        case LoginActions.states.LOGIN_CONFIRMATION_FAILURE:
        case LoginActions.states.LOGIN_REGISTER_FAILURE:
        case LoginActions.states.LOGIN_FAILURE:
            return {
                ...state,
                isError: true,
                errorMessage: action.error,
            };
        default:
            return state;
    }
};

export default appReducer;
