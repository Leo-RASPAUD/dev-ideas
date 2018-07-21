import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import Typography from '@material-ui/core/Typography';
import Router from 'components/Router/Router.container';
import LoadingBar from 'react-redux-loading-bar';

const styles = () => ({
    logoIcon: {
        marginRight: 20,
    },
    root: {
        background: 'radial-gradient(circle, #36383F, #202125)',
        height: '100%',
    },
    loadingBar: {
        height: 2,
        position: 'absolute',
        backgroundColor: 'white',
    },
});

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
                <LoadingBar className={classes.loadingBar} />
                <Router />
            </div>
        );
    }
}

export default App;
