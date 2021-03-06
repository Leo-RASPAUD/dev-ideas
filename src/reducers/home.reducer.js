import HomeActions from 'components/Home/Home.actions';

const initialState = {
    isLoadingIdeas: true,
    error: '',
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeActions.states.HOME_LIST_IDEAS_SUCCESS:
            return {
                ...state,
                isLoadingIdeas: false,
                error: '',
            };
        case HomeActions.states.HOME_LIST_IDEAS_FAILURE:
            return {
                ...state,
                isLoadingIdeas: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default appReducer;
