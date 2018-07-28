import cssConstants from 'constants/css.constants';

const contentHeight = 100;
const contentPadding = 20;
const buttonsHeight = 50;
const buttonsPadding = 10;

const styles = () => ({
    logoIcon: {
        marginRight: 20,
    },
    flex: {
        flexGrow: 1,
    },
    accountCircle: {
        backgroundColor: 'transparent',
    },
    signOutButton: {
        minHeight: 36,
        color: 'white',
        textTransform: 'initial',
    },
    contentWrapper: {
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
