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
        padding: 25,
        margin: 50,
    },
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.center,
        transition: 'all 0.15s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    errorMessage: {
        margin: theme.spacing.unit,
    },
    rootWrapper: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.center,
    },
    smallerForScale: {
        width: '90%',
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
