import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Router from './Router.component';

const mapStateToProps = state => ({
    user: state.login.user,
});

export default withRouter(connect(mapStateToProps)(Router));
