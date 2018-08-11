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
        subscribeToNewIdeas: PropTypes.func.isRequired,
        subscribeToDeleteIdea: PropTypes.func.isRequired,
        subscribeToDownvotedIdea: PropTypes.func.isRequired,
        subscribeToUpvotedIdea: PropTypes.func.isRequired,
        isLoadingIdeas: PropTypes.bool.isRequired,
        ideas: PropTypes.array.isRequired,
    };

    componentWillMount = () => {
        const {
            listIdeas,
            subscribeToNewIdeas,
            subscribeToDeleteIdea,
            user,
            subscribeToUpvotedIdea,
            subscribeToDownvotedIdea,
        } = this.props;
        listIdeas({ currentEmail: user.email });
        subscribeToNewIdeas();
        subscribeToDeleteIdea();
        subscribeToDownvotedIdea({ currentEmail: user.email });
        subscribeToUpvotedIdea({ currentEmail: user.email });
    };

    render() {
        const { classes, user, ideas, isLoadingIdeas } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.pageHeader}>
                    <Typography variant="title">Welcome</Typography>
                    <Typography variant="subheading">{user.email}</Typography>
                </div>
                {isLoadingIdeas && <CircularProgress color="secondary" />}
                {!isLoadingIdeas && <Ideas ideas={ideas} />}
            </div>
        );
    }
}

export default Home;
