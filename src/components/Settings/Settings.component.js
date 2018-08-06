import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Paper,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';

import styles from './Settings.styles';

@withStyles(styles)
class Settings extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        submitNewPassword: PropTypes.func.isRequired,
        isError: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
    };

    state = {
        oldPassword: '',
        newPassword: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes, submitNewPassword, isError, errorMessage } = this.props;
        const { oldPassword, newPassword } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.pageHeader}>
                    <Typography variant="title" style={{ color: 'white' }}>
                        Settings
                    </Typography>
                </div>
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                        <Typography variant="subheading" className={classes.settingTitle}>
                            Change your password
                        </Typography>
                        <Paper className={classes.paper}>
                            <form className={classes.form}>
                                <TextField
                                    id="oldPassword"
                                    autoComplete="old password"
                                    label="Old password"
                                    className={classes.textField}
                                    value={oldPassword}
                                    onChange={this.handleChange('oldPassword')}
                                    margin="normal"
                                    type="password"
                                />
                                <TextField
                                    id="newPassword"
                                    autoComplete="new password"
                                    label="New password"
                                    className={classes.textField}
                                    value={newPassword}
                                    onChange={this.handleChange('newPassword')}
                                    margin="normal"
                                    type="password"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() =>
                                        submitNewPassword({
                                            oldPassword,
                                            newPassword,
                                        })
                                    }
                                >
                                    Submit new password
                                </Button>
                            </form>
                            {isError && (
                                <div className={classes.error}>
                                    <ErrorOutline color="error" />
                                    <Typography
                                        color="error"
                                        variant="subheading"
                                        className={classes.errorMessage}
                                    >
                                        {errorMessage}
                                    </Typography>
                                </div>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Settings;
