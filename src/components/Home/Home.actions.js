import { API, graphqlOperation } from 'aws-amplify';
import ideaQueries from 'queries/Ideas';

const states = {
    HOME_LIST_IDEAS_LOADING: 'HOME_LIST_IDEAS_LOADING',
    HOME_LIST_IDEAS_SUCCESS: 'HOME_LIST_IDEAS_SUCCESS',
    HOME_LIST_IDEAS_FAILURE: 'HOME_LIST_IDEAS_FAILURE',
};

const listIdeasLoading = () => ({ type: states.HOME_LIST_IDEAS_LOADING });
const listIdeasSuccessAction = ({ ideas }) => ({ type: states.HOME_LIST_IDEAS_SUCCESS, ideas });
const listIdeasFailureAction = ({ error }) => ({ type: states.HOME_LIST_IDEAS_FAILURE, error });

const listIdeas = () => async dispatch => {
    dispatch(listIdeasLoading());
    try {
        const result = await API.graphql(graphqlOperation(ideaQueries.listIdeas, { count: 10 }));
        dispatch(listIdeasSuccessAction({ ideas: result.data.allIdeas.ideas }));
    } catch (error) {
        dispatch(
            listIdeasFailureAction({
                error: error.errors.map(internalError => internalError.message).join(', '),
            }),
        );
    }
};

export default {
    listIdeas,
    states,
};
