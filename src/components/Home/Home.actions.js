import { API, graphqlOperation } from 'aws-amplify';
import ideaQueries from 'queries/Ideas';
import errorHandler from 'utils/graphqlErrorHandler';
import ideaSubscriptions from 'subscriptions/Ideas';
import snackbarUtils from 'utils/snackbarUtils';

const states = {
    HOME_LIST_IDEAS_LOADING: 'HOME_LIST_IDEAS_LOADING',
    HOME_LIST_IDEAS_SUCCESS: 'HOME_LIST_IDEAS_SUCCESS',
    HOME_LIST_IDEAS_FAILURE: 'HOME_LIST_IDEAS_FAILURE',
    HOME_ADD_IDEA_FROM_SUBSCRIPTION: 'HOME_ADD_IDEA_FROM_SUBSCRIPTION',
    HOME_DELETE_IDEA_FROM_SUBSCRIPTION: 'HOME_DELETE_IDEA_FROM_SUBSCRIPTION',
    UPVOTED_IDEA_FROM_SUBSCRIPTION: 'UPVOTED_IDEA_FROM_SUBSCRIPTION',
    DOWNVOTED_IDEA_FROM_SUBSCRIPTION: 'DOWNVOTED_IDEA_FROM_SUBSCRIPTION',
};

const listIdeasLoading = () => ({ type: states.HOME_LIST_IDEAS_LOADING });
const listIdeasFailureAction = ({ error }) => ({ type: states.HOME_LIST_IDEAS_FAILURE, error });

const upvotedIdeaFromSubscriptionAction = ({ idea }) => ({
    type: states.UPVOTED_IDEA_FROM_SUBSCRIPTION,
    idea,
});

const downvotedFromSubscriptionAction = ({ idea }) => ({
    type: states.DOWNVOTED_IDEA_FROM_SUBSCRIPTION,
    idea,
});

const listIdeasSuccessAction = ({ ideas, currentEmail }) => ({
    type: states.HOME_LIST_IDEAS_SUCCESS,
    ideas,
    currentEmail,
});

const newIdeaFromSubscriptionAction = ({ idea }) => ({
    type: states.HOME_ADD_IDEA_FROM_SUBSCRIPTION,
    idea,
});

const deletedIdeaFromSubscriptionAction = ({ id }) => ({
    type: states.HOME_DELETE_IDEA_FROM_SUBSCRIPTION,
    id,
});

const listIdeas = ({ currentEmail }) => async dispatch => {
    dispatch(listIdeasLoading());
    try {
        const result = await API.graphql(
            graphqlOperation(ideaQueries.listIdeas, { author: currentEmail }),
        );
        dispatch(listIdeasSuccessAction({ ideas: result.data.allIdeas.ideas, currentEmail }));
    } catch (error) {
        dispatch(listIdeasFailureAction({ error: errorHandler(error) }));
    }
};

const subscribeToNewIdeas = () => async dispatch => {
    API.graphql(graphqlOperation(ideaSubscriptions.subscribeToNewIdeas)).subscribe({
        next: eventData => {
            const idea = eventData.value.data.addedIdea;
            dispatch(newIdeaFromSubscriptionAction({ idea }));
            dispatch(
                snackbarUtils.displaySnackbarSuccess({
                    message: `A new idea has been added by ${idea.author}.`,
                }),
            );
        },
    });
};

const subscribeToDeleteIdea = () => async dispatch => {
    API.graphql(graphqlOperation(ideaSubscriptions.subscribeToDeleteIdea)).subscribe({
        next: eventData => {
            const idea = eventData.value.data.deletedIdea;
            dispatch(deletedIdeaFromSubscriptionAction({ id: idea.id }));
            dispatch(
                snackbarUtils.displaySnackbarInfo({
                    message: 'An idea has been deleted.',
                }),
            );
        },
    });
};

const subscribeToUpvotedIdea = ({ currentEmail }) => async dispatch => {
    API.graphql(graphqlOperation(ideaSubscriptions.subscribeToUpvotedIdea)).subscribe({
        next: eventData => {
            const idea = eventData.value.data.upvotedIdea;
            if (idea.updatedBy !== currentEmail) {
                dispatch(upvotedIdeaFromSubscriptionAction({ idea }));
            }
        },
    });
};

const subscribeToDownvotedIdea = ({ currentEmail }) => async dispatch => {
    API.graphql(graphqlOperation(ideaSubscriptions.subscribeToDownvotedIdea)).subscribe({
        next: eventData => {
            const idea = eventData.value.data.downvotedIdea;
            if (idea.updatedBy !== currentEmail) {
                dispatch(downvotedFromSubscriptionAction({ idea }));
            }
        },
    });
};

export default {
    listIdeas,
    subscribeToNewIdeas,
    subscribeToDeleteIdea,
    subscribeToUpvotedIdea,
    subscribeToDownvotedIdea,
    states,
};
