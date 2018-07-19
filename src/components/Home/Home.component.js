import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <div>{user.firstName}</div>
            </div>
        );
    }
}

export default Home;
