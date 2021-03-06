import cssConstants from 'constants/css.constants';

export default () => ({
    root: {
        padding: '2vh 5vw',
        height: '100%',
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        ...cssConstants.alignItems.center,
    },
    button: {
        marginTop: 32,
    },
    form: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        padding: '2vh',
    },
    settingTitle: {
        textAlign: 'left',
        marginLeft: 5,
    },
    pageHeader: {
        textAlign: 'center',
        margin: '2vh',
    },
});
