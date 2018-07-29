import cssConstants from 'constants/css.constants';
import red from '@material-ui/core/colors/red';

export default () => ({
    snackbarError: {
        backgroundColor: red[500],
        color: 'white',
    },
    message: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
    },
});
