import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle, Whatshot } from '@material-ui/icons';
import { Toolbar, Avatar, Typography, Popover, Button, IconButton } from '@material-ui/core';

import routes from '../../utils/routes';
import styles from './AppToolbar.styles';

@withStyles(styles)
class AppToolbar extends React.PureComponent {
    anchorEl = null;

    static propTypes = {
        classes: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        goToSettings: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
    };

    state = {
        open: false,
        positionTop: 200,
        positionLeft: 400,
    };

    handleClick = open => {
        this.setState(open);
    };

    handleSettingsButton = () => {
        const { goToSettings } = this.props;
        this.setState({ open: false });
        goToSettings();
    }

    handleSignOut = () => {
        const { signOut } = this.props;
        this.setState({ open: false });
        signOut();
    };

    popOver = () => {
        const { classes, user } = this.props;
        const { open, anchorReference, positionTop, positionLeft } = this.state;
        return (
            <Popover
                open={open}
                anchorEl={this.anchorEl}
                anchorReference={anchorReference}
                anchorPosition={{ top: positionTop, left: positionLeft }}
                onClose={() => this.handleClick({ open: false })}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className={classes.contentWrapper}>
                    <div className={classes.userProfile}>
                        {this.avatar()}
                        <div className={classes.profile}>
                            <div className={classes.username}>{user.email}</div>
                        </div>
                    </div>
                    <Button
                        onClick={this.handleSettingsButton}
                        color="secondary"
                        classes={{
                            root: classes.settingsButton,
                        }}
                    >
                        Settings
                    </Button>
                </div>
                <div className={classes.buttons}>
                    <Button
                        onClick={this.handleSignOut}
                        color="secondary"
                        variant="raised"
                        classes={{
                            root: classes.signOutButton,
                        }}
                    >
                        Sign out
                    </Button>
                </div>
            </Popover>
        );
    };

    avatar = () => {
        const { classes } = this.props;
        return (
            <Avatar classes={{ colorDefault: classes.accountCircle }}>
                <AccountCircle />
            </Avatar>
        );
    };

    render() {
        const { classes, isAuthenticated } = this.props;

        return (
            <Fragment>
                <Toolbar>
                    <Link to={routes.home} className={classes.logoLink}>
                        <Whatshot className={classes.logoIcon} />
                        <Typography variant="title" color="inherit">
                            Dev ideas
                        </Typography>
                    </Link>
                    {this.popOver()}
                    {isAuthenticated && (
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            onClick={() => this.handleClick({ open: true })}
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}
                        >
                            {this.avatar()}
                        </IconButton>
                    )}
                </Toolbar>
            </Fragment>
        );
    }
}

export default AppToolbar;
