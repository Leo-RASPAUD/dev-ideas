import cssConstants from 'constants/css.constants';
import red from '@material-ui/core/colors/red';

export default theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    form: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        padding: '1vh',
        margin: '2vh',
    },
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.center,
    },
    errorMessage: {
        margin: theme.spacing.unit,
    },
    error: {
        border: `1px solid ${red[500]}`,
        padding: 2,
        borderRadius: 8,
        marginTop: 10,
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.justifyContent.center,
    },
    buttonsWrapper: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
    },
    buttonsLeft: {
        flexGrow: 1,
    },
});
