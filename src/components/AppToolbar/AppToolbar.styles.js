import cssConstants from 'constants/css.constants';

const contentHeight = 100;
const contentPadding = 20;
const buttonsHeight = 50;
const buttonsPadding = 10;

const styles = theme => ({
    logoIcon: {
        marginRight: 20,
    },
    flex: {
        flexGrow: 1,
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
        height: contentHeight - contentPadding,
        padding: `0 ${contentPadding}px`,
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
    },
    username: {
        marginLeft: 10,
    },
    buttons: {
        height: buttonsHeight - 2 * buttonsPadding,
        padding: buttonsPadding,
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.flexEnd,
        ...cssConstants.alignItems.center,
        ...cssConstants.buttonBackgroundColor,
    },
});

export default styles;
