import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Ideas from 'components/Ideas/Ideas.component';

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
                <div style={{ textAlign: 'center' }}>
                    <h1>Home</h1>
                    <div>{user.email}</div>
                </div>
                {isLoadingIdeas && <CircularProgress color="secondary" />}
                {!isLoadingIdeas && <Ideas ideas={ideas} />}
            </div>
        );
    }
}

export default Home;
