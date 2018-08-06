import { Auth } from 'aws-amplify';

import snackbarUtils from 'utils/snackbarUtils';

const states = {
  CHANGE_PASSWORD_LOADING: 'CHANGE_PASSWORD_LOADING',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
};

const changePasswordLoading = () => ({ type: states.CHANGE_PASSWORD_LOADING });
const changePasswordSuccessAction = ({ user }) => ({ type: states.CHANGE_PASSWORD_SUCCESS, user });
const changePasswordFailureAction =
  ({ error }) => ({ type: states.CHANGE_PASSWORD_FAILURE, error });

const submitNewPassword = ({ oldPassword, newPassword }) => async dispatch => {
  dispatch(changePasswordLoading());
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(user, oldPassword, newPassword);
    dispatch(changePasswordSuccessAction(user));
    dispatch(snackbarUtils.displaySnackbarSuccess({ message: 'Password successfuly updated' }));
  } catch (error) {
    dispatch(changePasswordFailureAction({ error: error.message }));
  }
};

export default {
  submitNewPassword,
  states,
};
