import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SnackbarContent } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

import styles from './SnackbarError.styles';

@withStyles(styles)
class SnackbarError extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        message: PropTypes.string,
    };

    static defaultProps = {
        message: '',
    };

    render() {
        const { classes, message } = this.props;

        return (
            <SnackbarContent
                className={classes.snackbarError}
                aria-describedby="client-snackbar"
                message={
                    <div id="client-snackbar" className={classes.message}>
                        <ErrorIcon />
                        {message}
                    </div>
                }
            />
        );
    }
}

export default SnackbarError;
