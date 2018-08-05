import cssConstants from 'constants/css.constants';

export default () => ({
    root: {
        padding: '2vh 5vw',
        height: '100%',
    },
    form: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        padding: '1vh',
        margin: '2vh',
    },
    settingTitle: {
        color: 'white',
        textAlign: 'left',
        marginLeft: 5,
        fontSize: 18,
    },
});
