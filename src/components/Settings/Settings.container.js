import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Settings from './Settings.component';

const mapStateToProps = state => ({
    user: state.login.user,
});

export default withRouter(
    connect(
        mapStateToProps,
        null,
    )(Settings),
);
