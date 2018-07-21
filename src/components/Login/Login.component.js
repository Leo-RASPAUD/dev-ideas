import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Lock, Done, AccountCircle } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';

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
        } = this.props;
        const { email, password, confirmationCode } = this.state;
        return (
            <div className={classes.root}>
                <Paper className={classes.form}>
                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        value={email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        type="email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
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
                                        <Done />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    <div className={classes.buttonsWrapper}>
                        {displayConfirmation && (
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => validateCode({ confirmationCode, email })}
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
                            </div>
                        )}
                        {!displayConfirmation && (
                            <div>
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
                                    onClick={() => login({ email, password })}
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </div>
                    {isError && (
                        <Typography
                            color="error"
                            variant="subheading"
                            className={classes.errorMessage}
                        >
                            {errorMessage}
                        </Typography>
                    )}
                </Paper>
            </div>
        );
    }
}

export default Login;
