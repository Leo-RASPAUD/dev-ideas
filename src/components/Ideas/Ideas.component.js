import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { Edit, Save, Cancel } from '@material-ui/icons';
import { Paper, Typography, Button, IconButton, TextField } from '@material-ui/core';

import styles from './Ideas.styles';

@withStyles(styles)
class Ideas extends React.PureComponent {
    static propTypes = {
        ideas: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
        addIdea: PropTypes.func.isRequired,
        deleteIdea: PropTypes.func.isRequired,
        switchEditMode: PropTypes.func.isRequired,
        updateContent: PropTypes.func.isRequired,
        cancelEdit: PropTypes.func.isRequired,
        updateIdea: PropTypes.func.isRequired,
    };

    handleClick = ({ editInProgress, id, content }) => {
        const { switchEditMode, updateIdea } = this.props;
        switchEditMode({ id });
        if (editInProgress) {
            updateIdea({ id, content });
        }
    };

    render() {
        const { classes, ideas, addIdea, deleteIdea, updateContent, cancelEdit } = this.props;
        return (
            <Fragment>
                {ideas.map(idea => (
                    <Paper key={idea.id} className={classes.paper}>
                        <div>
                            {!idea.editInProgress && (
                                <IconButton
                                    variant="contained"
                                    style={{ backgroundColor: 'yellow' }}
                                    onClick={() =>
                                        this.handleClick({
                                            editInProgress: idea.editInProgress,
                                            id: idea.id,
                                        })
                                    }
                                >
                                    <Edit />
                                </IconButton>
                            )}
                            {idea.editInProgress && (
                                <Fragment>
                                    <IconButton
                                        variant="contained"
                                        style={{ backgroundColor: 'yellow' }}
                                        onClick={() =>
                                            this.handleClick({
                                                editInProgress: idea.editInProgress,
                                                id: idea.id,
                                                content: idea.content,
                                            })
                                        }
                                    >
                                        <Save />
                                    </IconButton>
                                    <IconButton
                                        variant="contained"
                                        style={{ backgroundColor: 'yellow' }}
                                        onClick={() => cancelEdit({ id: idea.id })}
                                    >
                                        <Cancel />
                                    </IconButton>
                                </Fragment>
                            )}
                            {!idea.editInProgress && (
                                <Typography>Content: {idea.content}</Typography>
                            )}
                            {idea.editInProgress && (
                                <TextField
                                    value={idea.content}
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={event =>
                                        updateContent({ id: idea.id, content: event.target.value })
                                    }
                                />
                            )}
                        </div>
                        <Typography>Author: {idea.author}</Typography>
                        <Typography>Updated on: {idea.updatedOn}</Typography>
                        <Typography>Created on: {idea.createdOn}</Typography>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: red[500] }}
                            onClick={() => deleteIdea({ id: idea.id })}
                        >
                            Delete
                        </Button>
                    </Paper>
                ))}
                <Button
                    variant="contained"
                    style={{ backgroundColor: green[500] }}
                    onClick={() => addIdea({ content: 'New !' })}
                >
                    Create new idea
                </Button>
            </Fragment>
        );
    }
}

export default Ideas;
