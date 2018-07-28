import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.component';
import actions from './Home.actions';

const mapStateToProps = state => ({
    user: state.login.user,
    isLoadingIdeas: state.home.isLoadingIdeas,
    ideas: state.home.ideas,
});

const mapDispatchToProps = dispatch => ({
    listIdeas: () => dispatch(actions.listIdeas()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Home),
);
