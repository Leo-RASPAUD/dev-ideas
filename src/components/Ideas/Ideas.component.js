import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import {
    Edit,
    Save,
    Cancel,
    Add,
    Clear,
    AccountCircle,
    DateRange,
    Update,
} from '@material-ui/icons';
import { Paper, IconButton, TextField, Grid, Tooltip, InputAdornment } from '@material-ui/core';

import styles from './Ideas.styles';

@withStyles(styles)
class Ideas extends React.PureComponent {
    static propTypes = {
        ideas: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
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
        const { classes, ideas, addIdea, deleteIdea, updateContent, cancelEdit, user } = this.props;
        return (
            <Grid container spacing={40} alignItems="center" justify="center">
                {ideas.map(idea => (
                    <Grid
                        item
                        xs={10}
                        sm={8}
                        md={5}
                        lg={4}
                        xl={2}
                        className={classnames('animated bounceInRight')}
                        key={idea.id}
                    >
                        <Paper className={classes.paper}>
                            <div>
                                <div className={classes.buttons}>
                                    {idea.editInProgress && (
                                        <Fragment>
                                            <Tooltip title="Cancel">
                                                <IconButton
                                                    variant="contained"
                                                    style={{ color: 'white' }}
                                                    onClick={() => cancelEdit({ id: idea.id })}
                                                >
                                                    <Cancel />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Save">
                                                <IconButton
                                                    variant="contained"
                                                    style={{ color: green[500] }}
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
                                            </Tooltip>
                                        </Fragment>
                                    )}
                                    {!idea.editInProgress && (
                                        <Fragment>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    size="small"
                                                    variant="contained"
                                                    style={{ color: green[500] }}
                                                    onClick={() =>
                                                        this.handleClick({
                                                            editInProgress: idea.editInProgress,
                                                            id: idea.id,
                                                        })
                                                    }
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    size="small"
                                                    variant="contained"
                                                    style={{ color: red[500] }}
                                                    onClick={() => deleteIdea({ id: idea.id })}
                                                >
                                                    <Clear />
                                                </IconButton>
                                            </Tooltip>
                                        </Fragment>
                                    )}
                                </div>
                            </div>

                            <div className={classes.content}>
                                <TextField
                                    multiline
                                    label="Content"
                                    value={idea.content}
                                    className={classes.textField}
                                    margin="normal"
                                    disabled={!idea.editInProgress}
                                    onChange={event =>
                                        updateContent({
                                            id: idea.id,
                                            content: event.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    disabled
                                    label="Author"
                                    value={idea.author}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                style={{ color: 'white' }}
                                            >
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    disabled
                                    label="Updated on"
                                    value={moment.unix(+idea.updatedOn / 1000).calendar()}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                style={{ color: 'white' }}
                                            >
                                                <Update />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    disabled
                                    label="Created on"
                                    value={moment.unix(+idea.createdOn / 1000).calendar()}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position="start"
                                                style={{ color: 'white' }}
                                            >
                                                <DateRange />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </Paper>
                    </Grid>
                ))}
                <Grid
                    item
                    xs={10}
                    sm={8}
                    md={5}
                    lg={4}
                    xl={2}
                    style={{ textAlign: 'center' }}
                    id="addButton"
                    className={classnames('animated bounceInLeft')}
                >
                    <Tooltip title="Add a new idea">
                        <IconButton
                            variant="contained"
                            style={{ backgroundColor: green[500] }}
                            onClick={() =>
                                addIdea({ content: 'My awesome new idea!', email: user.email })
                            }
                        >
                            <Add />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    }
}

export default Ideas;
