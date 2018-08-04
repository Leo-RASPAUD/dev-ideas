import cssConstants from 'constants/css.constants';

export default theme => ({
    paper: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    buttons: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.flexEnd,
        padding: '48px 48px 0 0',
    },
    content: {
        padding: '0 48px 48px 48px',
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    textField: {
        margin: theme.spacing.unit,
    },
    upvote: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        flex: 1,
        marginLeft: 48,
    },
    count: {
        ...cssConstants.cursor.default,
        color: 'white',
    },
    thumbButtons: {
        color: theme.palette.primary.main,
    },
    actionButtons: {
        marginRight: -36,
        marginTop: -36,
    },
    smallButton: {
        height: 40,
        width: 40,
    },
});
