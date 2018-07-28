import cssConstants from 'constants/css.constants';

export default () => ({
    paper: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
});
