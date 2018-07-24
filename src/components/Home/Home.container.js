import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.component';

const mapStateToProps = state => ({
    user: state.login.user,
});

export default withRouter(connect(mapStateToProps)(Home));
