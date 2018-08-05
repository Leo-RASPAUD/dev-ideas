import SettingsActions from 'components/Settings/Settings.actions';

const initialState = {
    errorMessage: '',
    isError: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SettingsActions.states.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isError: false,
                errorMessage: '',
            };
        case SettingsActions.states.CHANGE_PASSWORD_FAILURE:
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
