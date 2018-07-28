import { API, graphqlOperation } from 'aws-amplify';
import ideaQueries from 'queries/Ideas';
import errorHandler from 'utils/graphqlErrorHandler';

const states = {
    IDEA_ADD_IDEA_LOADING: 'IDEA_ADD_IDEA_LOADING',
    IDEA_ADD_IDEA_SUCCESS: 'IDEA_ADD_IDEA_SUCCESS',
    IDEA_ADD_IDEA_FAILURE: 'IDEA_ADD_IDEA_FAILURE',
    IDEA_DELETE_IDEA_LOADING: 'IDEA_DELETE_IDEA_LOADING',
    IDEA_DELETE_IDEA_SUCCESS: 'IDEA_DELETE_IDEA_SUCCESS',
    IDEA_DELETE_IDEA_FAILURE: 'IDEA_DELETE_IDEA_FAILURE',
};

const addIdeaLoading = () => ({ type: states.IDEA_ADD_IDEA_LOADING });
const addIdeaSuccessAction = ({ idea }) => ({ type: states.IDEA_ADD_IDEA_SUCCESS, idea });
const addIdeaFailureAction = ({ error }) => ({ type: states.IDEA_ADD_IDEA_FAILURE, error });
const deleteIdeaLoading = () => ({ type: states.IDEA_DELETE_IDEA_LOADING });
const deleteIdeaSuccessAction = ({ id }) => ({ type: states.IDEA_DELETE_IDEA_SUCCESS, id });
const deleteIdeaFailureAction = ({ error }) => ({ type: states.IDEA_DELETE_IDEA_FAILURE, error });

const addIdea = ({ content }) => async dispatch => {
    dispatch(addIdeaLoading());
    try {
        const result = await API.graphql(graphqlOperation(ideaQueries.addIdea, { content }));
        dispatch(addIdeaSuccessAction({ idea: result.data.addIdea }));
    } catch (error) {
        dispatch(addIdeaFailureAction({ error: errorHandler(error) }));
    }
};

const deleteIdea = ({ id }) => async dispatch => {
    dispatch(deleteIdeaLoading());
    try {
        await API.graphql(graphqlOperation(ideaQueries.deleteIdea, { id }));
        dispatch(deleteIdeaSuccessAction({ id }));
    } catch (error) {
        dispatch(deleteIdeaFailureAction({ error: errorHandler(error) }));
    }
};

export default {
    addIdea,
    deleteIdea,
    states,
};
