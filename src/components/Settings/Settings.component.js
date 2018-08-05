import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';

import styles from './Settings.styles';

@withStyles(styles)
class Settings extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    handleChange = (password) => {
        console.log(password);
    }

    render() {
        const { classes } = this.props;
        const oldPassword = '';
        const newPassword = '';
        return (
            <div className={classes.root}>
                <div style={{ textAlign: 'center', margin: '2vh' }}>
                    <Typography variant="title" style={{ color: 'white' }}>
                        Settings
                    </Typography>
                    <Grid container className={classes.root}>
                        <Grid item xs={10} sm={8} md={5} lg={4} xl={2}>
                            Change your password :
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
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Settings;
