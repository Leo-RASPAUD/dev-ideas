import cssConstants from 'constants/css.constants';

const styles = theme => ({
    logoIcon: {
        marginRight: 20,
    },
    root: {
        background: 'radial-gradient(circle, #36383F, #202125)',
        height: '100%',
    },
    loadingBar: {
        height: 2,
        position: 'absolute',
        backgroundColor: 'white',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    progressWrapper: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.center,
        ...cssConstants.alignItems.center,
        height: '100%',
    },
    flex: {
        flexGrow: 1,
    },
    accountCircle: {
        backgroundColor: 'transparent',
    },
});

export default styles;
