import { API, graphqlOperation } from 'aws-amplify';
import ideaQueries from 'queries/Ideas';
import errorHandler from 'utils/graphqlErrorHandler';
import ideaSubscriptions from 'subscriptions/Ideas';

const states = {
    HOME_LIST_IDEAS_LOADING: 'HOME_LIST_IDEAS_LOADING',
    HOME_LIST_IDEAS_SUCCESS: 'HOME_LIST_IDEAS_SUCCESS',
    HOME_LIST_IDEAS_FAILURE: 'HOME_LIST_IDEAS_FAILURE',
    HOME_ADD_IDEA_FROM_SUBSCRIPTION: 'HOME_ADD_IDEA_FROM_SUBSCRIPTION',
    HOME_DELETE_IDEA_FROM_SUBSCRIPTION: 'HOME_DELETE_IDEA_FROM_SUBSCRIPTION',
};

const listIdeasLoading = () => ({ type: states.HOME_LIST_IDEAS_LOADING });
const listIdeasSuccessAction = ({ ideas }) => ({ type: states.HOME_LIST_IDEAS_SUCCESS, ideas });
const listIdeasFailureAction = ({ error }) => ({ type: states.HOME_LIST_IDEAS_FAILURE, error });
const newIdeaFromSubscriptionAction = ({ idea }) => ({
    type: states.HOME_ADD_IDEA_FROM_SUBSCRIPTION,
    idea,
});
const deletedIdeaFromSubscriptionAction = ({ id }) => ({
    type: states.HOME_DELETE_IDEA_FROM_SUBSCRIPTION,
    id,
});

const listIdeas = () => async dispatch => {
    dispatch(listIdeasLoading());
    try {
        const result = await API.graphql(graphqlOperation(ideaQueries.listIdeas));
        dispatch(listIdeasSuccessAction({ ideas: result.data.allIdeas.ideas }));
    } catch (error) {
        dispatch(listIdeasFailureAction({ error: errorHandler(error) }));
    }
};

const subscribeToNewIdeas = () => async dispatch => {
    API.graphql(graphqlOperation(ideaSubscriptions.subscribeToNewIdeas)).subscribe({
        next: eventData => {
            const idea = eventData.value.data.addedIdea;
            dispatch(newIdeaFromSubscriptionAction({ idea }));
        },
    });
};
const subscribeToDeleteIdea = () => async dispatch => {
    API.graphql(graphqlOperation(ideaSubscriptions.subscribeToDeleteIdea)).subscribe({
        next: eventData => {
            const idea = eventData.value.data.deletedIdea;
            dispatch(deletedIdeaFromSubscriptionAction({ id: idea.id }));
        },
    });
};

export default {
    listIdeas,
    subscribeToNewIdeas,
    subscribeToDeleteIdea,
    states,
};
