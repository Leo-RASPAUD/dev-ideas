import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.component.js';

const mapStateToProps = state => ({
    user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(Home));
