import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Ideas from './Ideas.component';
import actions from './Ideas.actions';

const mapDispatchToProps = dispatch => ({
    addIdea: ({ content }) => dispatch(actions.addIdea({ content })),
    deleteIdea: ({ id }) => dispatch(actions.deleteIdea({ id })),
    switchEditMode: ({ id }) => dispatch(actions.switchEditMode({ id })),
    cancelEdit: ({ id }) => dispatch(actions.cancelEdit({ id })),
    updateContent: ({ id, content }) => dispatch(actions.updateContent({ id, content })),
    updateIdea: ({ id, content }) => dispatch(actions.updateIdea({ id, content })),
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(Ideas),
);
