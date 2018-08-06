import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Settings from './Settings.component';
import actions from './Settings.actions';

const mapStateToProps = state => ({
    isError: state.settings.isError,
    errorMessage: state.settings.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
    submitNewPassword: ({ oldPassword, newPassword }) => {
        dispatch(actions.submitNewPassword({ oldPassword, newPassword }));
    },
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Settings),
);
