import cssConstants from 'constants/css.constants';

export default () => ({
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
});
