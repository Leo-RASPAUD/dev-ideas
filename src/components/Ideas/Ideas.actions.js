import { API, graphqlOperation } from 'aws-amplify';
import ideaQueries from 'queries/Ideas';
import errorHandler from 'utils/graphqlErrorHandler';
import slack from 'utils/slack';

const states = {
    IDEA_ADD_IDEA_LOADING: 'IDEA_ADD_IDEA_LOADING',
    IDEA_ADD_IDEA_SUCCESS: 'IDEA_ADD_IDEA_SUCCESS',
    IDEA_ADD_IDEA_FAILURE: 'IDEA_ADD_IDEA_FAILURE',
    IDEA_UPDATE_IDEA_LOADING: 'IDEA_UPDATE_IDEA_LOADING',
    IDEA_UPDATE_IDEA_SUCCESS: 'IDEA_UPDATE_IDEA_SUCCESS',
    IDEA_UPDATE_IDEA_FAILURE: 'IDEA_UPDATE_IDEA_FAILURE',
    IDEA_DELETE_IDEA_LOADING: 'IDEA_DELETE_IDEA_LOADING',
    IDEA_DELETE_IDEA_SUCCESS: 'IDEA_DELETE_IDEA_SUCCESS',
    IDEA_DELETE_IDEA_FAILURE: 'IDEA_DELETE_IDEA_FAILURE',
    IDEA_SWITCH_EDIT_MODE: 'IDEA_SWITCH_EDIT_MODE',
    IDEA_EDIT_CONTENT: 'IDEA_EDIT_CONTENT',
    CANCEL_EDIT: 'CANCEL_EDIT',
};

const addIdeaLoading = () => ({ type: states.IDEA_ADD_IDEA_LOADING });
const addIdeaSuccessAction = ({ idea }) => ({ type: states.IDEA_ADD_IDEA_SUCCESS, idea });
const addIdeaFailureAction = ({ error }) => ({ type: states.IDEA_ADD_IDEA_FAILURE, error });

const updateIdeaLoading = () => ({ type: states.IDEA_UPDATE_IDEA_LOADING });
const updateIdeaSuccessAction = ({ idea }) => ({ type: states.IDEA_UPDATE_IDEA_SUCCESS, idea });
const updateIdeaFailureAction = ({ error }) => ({ type: states.IDEA_UPDATE_IDEA_FAILURE, error });

const deleteIdeaLoading = () => ({ type: states.IDEA_DELETE_IDEA_LOADING });
const deleteIdeaSuccessAction = ({ id }) => ({ type: states.IDEA_DELETE_IDEA_SUCCESS, id });
const deleteIdeaFailureAction = ({ error }) => ({ type: states.IDEA_DELETE_IDEA_FAILURE, error });

const switchEditModeAction = ({ id }) => ({ type: states.IDEA_SWITCH_EDIT_MODE, id });
const updateContentAction = ({ id, content }) => ({ type: states.IDEA_EDIT_CONTENT, id, content });
const cancelEditAction = ({ id }) => ({ type: states.CANCEL_EDIT, id });

const addIdea = ({ content, email }) => async dispatch => {
    dispatch(addIdeaLoading());
    try {
        const result = await API.graphql(graphqlOperation(ideaQueries.addIdea, { content, email }));
        dispatch(addIdeaSuccessAction({ idea: result.data.addIdea }));
        await slack.post({
            message: 'New idea!',
            fields: [
                {
                    title: 'User',
                    value: email,
                    short: true,
                },
                {
                    title: 'Content',
                    value: content,
                },
            ],
        });
        setTimeout(() => {
            document.getElementById('addButton').scrollIntoView({
                behavior: 'smooth',
            });
        }, 250);
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
const updateIdea = ({ id, content }) => async dispatch => {
    dispatch(updateIdeaLoading());
    try {
        const result = await API.graphql(graphqlOperation(ideaQueries.updateIdea, { id, content }));
        await slack.post({
            message: 'An idea has been updated!',
            fields: [
                {
                    title: 'id',
                    value: id,
                    short: true,
                },
                {
                    title: 'Content',
                    value: content,
                },
            ],
        });
        dispatch(updateIdeaSuccessAction({ idea: result.data.updateIdea }));
    } catch (error) {
        dispatch(updateIdeaFailureAction({ error: errorHandler(error) }));
    }
};

const switchEditMode = ({ id }) => dispatch => {
    dispatch(switchEditModeAction({ id }));
};
const updateContent = ({ id, content }) => dispatch => {
    dispatch(updateContentAction({ id, content }));
};
const cancelEdit = ({ id }) => dispatch => {
    dispatch(cancelEditAction({ id }));
};

export default {
    addIdea,
    cancelEdit,
    deleteIdea,
    switchEditMode,
    updateContent,
    updateIdea,
    states,
};