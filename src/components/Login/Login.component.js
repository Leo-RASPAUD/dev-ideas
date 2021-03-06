import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Lock, Done, AccountCircle, ErrorOutline } from '@material-ui/icons';
import {
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Grid,
    InputAdornment,
} from '@material-ui/core';

import styles from './Login.styles';

@withStyles(styles)
class Login extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        registerUser: PropTypes.func.isRequired,
        validateCode: PropTypes.func.isRequired,
        cancelRegister: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        displayConfirmation: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
    };

    state = {
        email: '',
        password: '',
        confirmationCode: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {
            classes,
            registerUser,
            displayConfirmation,
            login,
            validateCode,
            cancelRegister,
            isError,
            errorMessage,
            isLoading,
        } = this.props;
        const { email, password, confirmationCode } = this.state;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={10} sm={8} md={5} lg={4} xl={2}>
                    <Paper className={classes.paper}>
                        <form
                            className={classes.form}
                            onSubmit={event => {
                                event.preventDefault();
                                login({ email, password });
                            }}
                        >
                            <TextField
                                id="email"
                                autoComplete="email"
                                label="Email"
                                className={classes.textField}
                                value={email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                type="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                id="password"
                                type="password"
                                label="Password"
                                autoComplete="current-password"
                                className={classes.textField}
                                value={password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {displayConfirmation && (
                                <TextField
                                    id="confirmationCode"
                                    type="confirmationCode"
                                    label="Confirmation code"
                                    className={classes.textField}
                                    value={confirmationCode}
                                    onChange={this.handleChange('confirmationCode')}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Done color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                            <div className={classes.buttonsWrapper}>
                                <div className={classes.buttonsLeft}>
                                    {displayConfirmation && (
                                        <Fragment>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={() =>
                                                    validateCode({
                                                        confirmationCode,
                                                        email,
                                                        password,
                                                    })
                                                }
                                            >
                                                Validate code
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={() => cancelRegister({ email })}
                                            >
                                                Cancel
                                            </Button>
                                        </Fragment>
                                    )}
                                    {!displayConfirmation && (
                                        <Fragment>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={() => registerUser({ email, password })}
                                            >
                                                Register
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                type="submit"
                                            >
                                                Login
                                            </Button>
                                        </Fragment>
                                    )}
                                </div>

                                {isLoading && <CircularProgress color="secondary" />}
                            </div>
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
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Login;
