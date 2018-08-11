import cssConstants from 'constants/css.constants';

const styles = theme => ({
    logoIcon: {
        marginRight: 3 * theme.spacing.unit,
    },
    root: {
        background: '#f6f6f6',
        height: 'auto',
        minHeight: '100%',
    },
    loadingBar: {
        height: 2,
        position: 'absolute',
        backgroundColor: theme.palette.secondary.main,
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
