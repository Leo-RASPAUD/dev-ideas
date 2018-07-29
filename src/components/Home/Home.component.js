import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import Ideas from 'components/Ideas/Ideas.container';

import styles from './Home.styles';

@withStyles(styles)
class Home extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        listIdeas: PropTypes.func.isRequired,
        isLoadingIdeas: PropTypes.bool.isRequired,
        ideas: PropTypes.array.isRequired,
    };

    componentDidMount = () => {
        const { listIdeas } = this.props;
        listIdeas();
    };

    render() {
        // Todo: test errors (remove conf)
        const { classes, user, ideas, isLoadingIdeas } = this.props;
        return (
            <div className={classes.root}>
                <div style={{ textAlign: 'center', margin: '2vh' }}>
                    <Typography variant="title" style={{ color: 'white' }}>
                        Welcome
                    </Typography>
                    <Typography variant="subheading" style={{ color: 'white' }}>
                        {user.email}
                    </Typography>
                </div>
                {isLoadingIdeas && <CircularProgress color="secondary" />}
                {!isLoadingIdeas && <Ideas ideas={ideas} />}
            </div>
        );
    }
}

export default Home;
