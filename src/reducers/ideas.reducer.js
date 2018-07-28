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
                ideas: action.ideas.map(idea => ({
                    ...idea,
                    editInProgress: false,
                    initialContent: idea.content,
                })),
            };
        case IdeasActions.states.IDEA_ADD_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.concat({
                    editInProgress: false,
                    ...action.idea,
                    initialContent: action.idea.content,
                }),
            };
        case IdeasActions.states.IDEA_UPDATE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    const ideaCopy = { ...idea };
                    if (ideaCopy.id === action.idea.id) {
                        return {
                            ...action.idea,
                            editInProgress: false,
                            initialContent: action.idea.content,
                        };
                    }
                    return ideaCopy;
                }),
            };
        case IdeasActions.states.IDEA_EDIT_CONTENT:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    const ideaCopy = { ...idea };
                    if (ideaCopy.id === action.id) {
                        ideaCopy.content = action.content;
                    }
                    return ideaCopy;
                }),
            };
        case IdeasActions.states.IDEA_DELETE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.filter(idea => idea.id !== action.id),
            };
        case IdeasActions.states.IDEA_SWITCH_EDIT_MODE:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    const ideaCopy = { ...idea };
                    if (ideaCopy.id === action.id) {
                        ideaCopy.editInProgress = !ideaCopy.editInProgress;
                    }
                    return ideaCopy;
                }),
            };
        case IdeasActions.states.CANCEL_EDIT:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    const ideaCopy = { ...idea };
                    if (ideaCopy.id === action.id) {
                        ideaCopy.content = ideaCopy.initialContent;
                        ideaCopy.editInProgress = false;
                    }
                    return ideaCopy;
                }),
            };
        default:
            return state;
    }
};

export default appReducer;
