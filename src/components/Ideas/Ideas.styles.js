import cssConstants from 'constants/css.constants';

export default () => ({
    paper: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    buttons: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.flexEnd,
        padding: '10px 10px 0 0',
    },
    content: {
        padding: '0 48px 48px 48px',
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
});
