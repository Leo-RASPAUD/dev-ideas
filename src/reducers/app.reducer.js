import AppActions from 'components/App/App.actions';

const initialState = {
    isAppInitializing: true,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case AppActions.states.CHECK_SESSION_SUCCESS:
        case AppActions.states.CHECK_SESSION_FAILURE:
            return {
                ...state,
                isAppInitializing: false,
            };
        case AppActions.states.CHECK_SESSION_LOADING:
            return {
                ...state,
                isAppInitializing: true,
            };
        default:
            return state;
    }
};

export default appReducer;
