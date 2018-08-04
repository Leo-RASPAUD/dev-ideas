import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.component';
import actions from './Home.actions';

const mapStateToProps = state => ({
    user: state.login.user,
    isLoadingIdeas: state.home.isLoadingIdeas,
    ideas: state.ideas.ideas,
});

const mapDispatchToProps = dispatch => ({
    listIdeas: () => dispatch(actions.listIdeas()),
    subscribeToNewIdeas: () => dispatch(actions.subscribeToNewIdeas()),
    subscribeToDeleteIdea: () => dispatch(actions.subscribeToDeleteIdea()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Home),
);
