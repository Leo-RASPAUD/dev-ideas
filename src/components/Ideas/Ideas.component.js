import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import styles from './Ideas.styles';

@withStyles(styles)
class Ideas extends React.PureComponent {
    static propTypes = {
        ideas: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes, ideas } = this.props;
        return ideas.map(idea => (
            <Paper key={idea.id} className={classes.paper}>
                <Typography>Content: {idea.content}</Typography>
                <Typography>Author: {idea.author}</Typography>
                <Typography>Updated on: {idea.updatedOn}</Typography>
                <Typography>Created on: {idea.createdOn}</Typography>
            </Paper>
        ));
    }
}

export default Ideas;
