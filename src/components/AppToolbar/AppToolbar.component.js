import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import styles from './AppToolbar.styles';

@withStyles(styles)
class AppToolbar extends React.PureComponent {
    anchorEl = null;

    static propTypes = {
        classes: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
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
                    {this.avatar()}
                    <div className={classes.username}>{user.email}</div>
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
                    <WhatsHotIcon className={classes.logoIcon} />
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Dev ideas
                    </Typography>
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
