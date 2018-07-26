import cssConstants from 'constants/css.constants';

export default theme => ({
    paper: {
        backgroundColor: 'rgba(0, 0, 0, 0.18)',
    },
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
        padding: 25,
        margin: 50,
    },
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.center,
    },
    errorMessage: {
        margin: theme.spacing.unit,
    },
    error: {
        border: '1px solid #F44336',
        padding: 2,
        borderRadius: 8,
        marginTop: 10,
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.justifyContent.center,
    },
});
