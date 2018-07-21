import cssConstants from 'constants/css.constants';

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
        width: '25%',
        padding: 25,
        margin: 25,
    },
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.center,
    },
    errorMessage: {
        margin: theme.spacing.unit,
    },
});
