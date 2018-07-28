import HomeActions from 'components/Home/Home.actions';
import IdeasActions from 'components/Ideas/Ideas.actions';

const initialState = {
    ideas: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeActions.states.HOME_LIST_IDEAS_SUCCESS:
            return {
                ...state,
                ideas: action.ideas,
            };
        case IdeasActions.states.IDEA_ADD_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.concat(action.idea),
            };
        case IdeasActions.states.IDEA_DELETE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.filter(idea => idea.id !== action.id),
            };
        default:
            return state;
    }
};

export default appReducer;
