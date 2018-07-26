import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Home</h1>
                <div>{user.email}</div>
            </div>
        );
    }
}

export default Home;
