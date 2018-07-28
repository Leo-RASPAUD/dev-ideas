import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';

import styles from './Ideas.styles';

@withStyles(styles)
class Ideas extends React.PureComponent {
    static propTypes = {
        ideas: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
        addIdea: PropTypes.func.isRequired,
        deleteIdea: PropTypes.func.isRequired,
    };

    render() {
        const { classes, ideas, addIdea, deleteIdea } = this.props;
        return (
            <Fragment>
                {ideas.map(idea => (
                    <Paper key={idea.id} className={classes.paper}>
                        <Typography>Content: {idea.content}</Typography>
                        <Typography>Author: {idea.author}</Typography>
                        <Typography>Updated on: {idea.updatedOn}</Typography>
                        <Typography>Created on: {idea.createdOn}</Typography>
                        <Button onClick={() => deleteIdea({ id: idea.id })}>Delete</Button>
                    </Paper>
                ))}
                <Button onClick={() => addIdea({ content: 'New !' })}>Create new idea</Button>
            </Fragment>
        );
    }
}

export default Ideas;
