import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Ideas from './Ideas.component';
import actions from './Ideas.actions';

// const mapStateToProps = state => ({
//     user: state.login.user,
//     isLoadingIdeas: state.home.isLoadingIdeas,
//     ideas: state.home.ideas,
// });

const mapDispatchToProps = dispatch => ({
    addIdea: ({ content }) => dispatch(actions.addIdea({ content })),
    deleteIdea: ({ id }) => dispatch(actions.deleteIdea({ id })),
});

export default withRouter(
    connect(
        // mapStateToProps,
        null,
        mapDispatchToProps,
    )(Ideas),
);
