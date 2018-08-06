import cssConstants from 'constants/css.constants';

const contentPadding = 10;
const buttonsPadding = 10;

const styles = theme => ({
    logoIcon: {
        marginRight: 20,
    },
    logoLink: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'white',
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.row,
    },
    accountCircle: {
        backgroundColor: 'transparent',
    },
    profile: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    settingsButton: {
        minHeight: 36,
        color: 'white',
        textTransform: 'initial',
    },
    signOutButton: {
        minHeight: 36,
        color: 'white',
        textTransform: 'initial',
    },
    contentWrapper: {
        backgroundColor: '#2a2b31',
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
        ...cssConstants.buttonBackgroundColor,
    },
});

export default styles;
