import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import Typography from '@material-ui/core/Typography';
import Router from 'components/Router/Router.container';

const styles = {
    root: {
        flexGrow: 1,
    },
    logoIcon: {
        marginRight: 20,
    },
};

@withStyles(styles)
class App extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <WhatsHotIcon className={classes.logoIcon} />
                        <Typography variant="title" color="inherit">
                            Dev ideas
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Router />
            </div>
        );
    }
}

export default App;
