import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Ideas from './Ideas.component';
import actions from './Ideas.actions';

const mapStateToProps = state => ({
    user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
    addIdea: ({ content, email }) => dispatch(actions.addIdea({ content, email })),
    deleteIdea: ({ id }) => dispatch(actions.deleteIdea({ id })),
    switchEditMode: ({ id }) => dispatch(actions.switchEditMode({ id })),
    downvoteIdea: ({ id, email }) => dispatch(actions.downvoteIdea({ id, email })),
    upvoteIdea: ({ id, email }) => dispatch(actions.upvoteIdea({ id, email })),
    cancelEdit: ({ id }) => dispatch(actions.cancelEdit({ id })),
    updateContent: ({ id, content }) => dispatch(actions.updateContent({ id, content })),
    updateIdea: ({ id, content, email }) => dispatch(actions.updateIdea({ id, content, email })),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Ideas),
);
