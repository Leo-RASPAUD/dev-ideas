import HomeActions from 'components/Home/Home.actions';
import IdeasActions from 'components/Ideas/Ideas.actions';

const initialState = {
    ideas: [],
};

const getInitialIdea = idea => ({
    ...idea,
    votes: idea.votes ? idea.votes : [],
    editInProgress: false,
    initialContent: idea.content,
});

const getIdeasAfterSubscription = ({ action, state }) => {
    const newIdea = action.idea;
    if (state.ideas.find(idea => idea.id === newIdea.id)) {
        return state.ideas;
    }
    return state.ideas.concat({
        ...getInitialIdea(action.idea),
        votes: action.idea.votes ? action.idea.votes : [],
        isUpvoteAvailable: true,
    });
};

const sortByContent = (a, b) => {
    if (a.content < b.content) return -1;
    if (a.content > b.content) return 1;
    return 0;
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeActions.states.UPVOTED_IDEA_FROM_SUBSCRIPTION:
        case HomeActions.states.DOWNVOTED_IDEA_FROM_SUBSCRIPTION:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    if (idea.id === action.idea.id) {
                        return {
                            ...idea,
                            votes: action.idea.votes ? action.idea.votes : [],
                        };
                    }
                    return idea;
                }),
            };
        case HomeActions.states.HOME_LIST_IDEAS_SUCCESS:
            return {
                ...state,
                ideas: action.ideas
                    .map(idea => ({
                        ...getInitialIdea(idea),
                        isUpvoteAvailable:
                            !idea.votes || !idea.votes.find(email => email === action.currentEmail),
                    }))
                    .sort(sortByContent),
            };
        case IdeasActions.states.IDEA_ADD_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.concat({
                    ...getInitialIdea(action.idea),
                    isUpvoteAvailable: true,
                }),
            };
        case IdeasActions.states.IDEA_DOWNVOTE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    if (idea.id === action.idea.id) {
                        return {
                            ...action.idea,
                            votes: action.idea.votes ? action.idea.votes : [],
                            isUpvoteAvailable: true,
                        };
                    }
                    return idea;
                }),
            };
        case IdeasActions.states.IDEA_UPVOTE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    if (idea.id === action.idea.id) {
                        return {
                            ...action.idea,
                            isUpvoteAvailable: false,
                        };
                    }
                    return idea;
                }),
            };
        case IdeasActions.states.IDEA_UPDATE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    if (idea.id === action.idea.id) {
                        return getInitialIdea(action.idea);
                    }
                    return idea;
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
        case IdeasActions.states.CHANGE_VISIBILITY_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.map(idea => {
                    if (idea.id === action.id) {
                        return {
                            ...idea,
                            isPublic: !idea.isPublic,
                        };
                    }
                    return idea;
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
