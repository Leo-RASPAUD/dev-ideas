import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import styles from './Login.styles';

@withStyles(styles)
class Login extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        registerUser: PropTypes.func.isRequired,
        confirmUser: PropTypes.func.isRequired,
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
            confirmUser,
            isError,
            errorMessage,
        } = this.props;
        const { email, password, confirmationCode } = this.state;
        return (
            <div>
                <div>
                    <TextField
                        id="email"
                        label="email"
                        className={classes.textField}
                        value={email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        type="email"
                    />
                    <TextField
                        id="password"
                        type="password"
                        label="password"
                        className={classes.textField}
                        value={password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    {displayConfirmation && (
                        <TextField
                            id="confirmationCode"
                            type="confirmationCode"
                            label="confirmationCode"
                            className={classes.textField}
                            value={confirmationCode}
                            onChange={this.handleChange('confirmationCode')}
                            margin="normal"
                        />
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            if (displayConfirmation) {
                                confirmUser({ confirmationCode, email });
                            } else {
                                registerUser({ email, password });
                            }
                        }}
                    >
                        {displayConfirmation && 'Verify code'}
                        {!displayConfirmation && 'Register'}
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
                {isError && (
                    <Typography color="error" variant="subheading">
                        {errorMessage}
                    </Typography>
                )}
            </div>
        );
    }
}

export default Login;
