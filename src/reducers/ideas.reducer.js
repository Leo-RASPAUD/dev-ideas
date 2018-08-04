import HomeActions from 'components/Home/Home.actions';
import IdeasActions from 'components/Ideas/Ideas.actions';

const initialState = {
    ideas: [],
};

const getInitialIdea = idea => ({
    ...idea,
    editInProgress: false,
    initialContent: idea.content,
});

const getIdeasAfterSubscription = ({ action, state }) => {
    const newIdea = action.idea;
    if (state.ideas.find(idea => idea.id === newIdea.id)) {
        return state.ideas;
    }
    return state.ideas.concat(getInitialIdea(action.idea));
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeActions.states.HOME_LIST_IDEAS_SUCCESS:
            return {
                ...state,
                ideas: action.ideas.map(idea => getInitialIdea(idea)),
            };
        case IdeasActions.states.IDEA_ADD_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.concat(getInitialIdea(action.idea)),
            };
        case IdeasActions.states.IDEA_UPDATE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    const ideaCopy = { ...idea };
                    if (ideaCopy.id === action.idea.id) {
                        return getInitialIdea(action.idea);
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
        case HomeActions.states.HOME_DELETE_IDEA_FROM_SUBSCRIPTION:
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
        case HomeActions.states.HOME_ADD_IDEA_FROM_SUBSCRIPTION:
            return {
                ...state,
                ideas: getIdeasAfterSubscription({ action, state }),
            };
        default:
            return state;
    }
};

export default appReducer;
