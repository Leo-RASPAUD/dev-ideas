import cssConstants from 'constants/css.constants';

const contentPadding = 10;
const buttonsPadding = 10;

const styles = theme => ({
    logoIcon: {
        marginRight: 3 * theme.spacing.unit,
    },
    title: {
        flexGrow: 1,
        ...cssConstants.cursor.default,
    },
    accountCircle: {
        backgroundColor: 'transparent',
    },
    profile: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    settingsButton: {
        minHeight: 4 * theme.spacing.unit,
        color: 'white',
        textTransform: 'initial',
    },
    signOutButton: {
        minHeight: 4 * theme.spacing.unit,
        textTransform: 'initial',
    },
    contentWrapper: {
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        padding: `${contentPadding}px`,
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.flexEnd,
        ...cssConstants.flexDirection.column,
    },
    userProfile: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.flexDirection.row,
    },
    username: {
        margin: '0 5px',
    },
    buttons: {
        padding: buttonsPadding,
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.flexEnd,
        ...cssConstants.alignItems.center,
    },
    textToolbar: {
        marginRight: 2 * theme.spacing.unit,
        transition: `all ${theme.transitions.duration.complex}ms ${
            theme.transitions.easing.easeInOut
        }`,
        color: 'white',
        '&:hover': {
            color: theme.palette.secondary.main,
        },
    },
});

export default styles;
