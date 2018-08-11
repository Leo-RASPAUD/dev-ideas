import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import {
    Edit,
    Save,
    SettingsBackupRestore,
    Add,
    Clear,
    AccountCircle,
    DateRange,
    Update,
    ThumbUp,
    ThumbUpOutlined,
    Public,
    LockOutlined,
} from '@material-ui/icons';
import {
    Paper,
    IconButton,
    TextField,
    Grid,
    Tooltip,
    InputAdornment,
    Typography,
} from '@material-ui/core';

import styles from './Ideas.styles';

@withStyles(styles)
class Ideas extends React.PureComponent {
    static propTypes = {
        ideas: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        addIdea: PropTypes.func.isRequired,
        handleChangeVisibility: PropTypes.func.isRequired,
        deleteIdea: PropTypes.func.isRequired,
        switchEditMode: PropTypes.func.isRequired,
        updateContent: PropTypes.func.isRequired,
        cancelEdit: PropTypes.func.isRequired,
        updateIdea: PropTypes.func.isRequired,
        upvoteIdea: PropTypes.func.isRequired,
        downvoteIdea: PropTypes.func.isRequired,
    };

    handleClick = ({ editInProgress, id, content }) => {
        const { switchEditMode, updateIdea, user } = this.props;
        const { email } = user;
        switchEditMode({ id });
        if (editInProgress) {
            updateIdea({ id, content, email });
        }
    };

    handleVote = ({ isUpvoteAvailable, id, email }) => {
        const { upvoteIdea, downvoteIdea } = this.props;
        if (isUpvoteAvailable) {
            upvoteIdea({ id, email });
        } else {
            downvoteIdea({ id, email });
        }
    };

    render() {
        const {
            classes,
            ideas,
            addIdea,
            deleteIdea,
            updateContent,
            cancelEdit,
            user,
            handleChangeVisibility,
        } = this.props;

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
                                    <div className={classes.upvote}>
                                        {idea.author === user.email && (
                                            <Tooltip
                                                title={
                                                    idea.isPublic
                                                        ? 'Idea visible by everyone'
                                                        : 'Idea visible only by you'
                                                }
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        handleChangeVisibility({
                                                            isPublic: !idea.isPublic,
                                                            id: idea.id,
                                                            email: user.email,
                                                        })
                                                    }
                                                >
                                                    {idea.isPublic && (
                                                        <Public
                                                            className={classes.visibilityButtons}
                                                        />
                                                    )}
                                                    {!idea.isPublic && (
                                                        <LockOutlined
                                                            className={classes.visibilityButtons}
                                                        />
                                                    )}
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <IconButton
                                            onClick={() =>
                                                this.handleVote({
                                                    isUpvoteAvailable: idea.isUpvoteAvailable,
                                                    id: idea.id,
                                                    email: user.email,
                                                })
                                            }
                                        >
                                            {!idea.isUpvoteAvailable && (
                                                <ThumbUp className={classes.thumbButtons} />
                                            )}
                                            {idea.isUpvoteAvailable && (
                                                <ThumbUpOutlined className={classes.thumbButtons} />
                                            )}
                                        </IconButton>
                                        {idea.votes.length > 0 && (
                                            <Typography
                                                variant="subheading"
                                                data-tip
                                                data-for={`tooltip-upvote-${idea.id}`}
                                                className={classes.count}
                                            >
                                                {idea.votes.length}
                                                <ReactTooltip id={`tooltip-upvote-${idea.id}`}>
                                                    {idea.votes.map(vote => (
                                                        <div key={vote}>{vote}</div>
                                                    ))}
                                                </ReactTooltip>
                                            </Typography>
                                        )}
                                    </div>
                                    {idea.author === user.email && (
                                        <div className={classes.actionButtons}>
                                            {idea.editInProgress && (
                                                <Fragment>
                                                    <Tooltip title="Save">
                                                        <IconButton
                                                            classes={{
                                                                root: classes.smallButton,
                                                            }}
                                                            size="small"
                                                            variant="contained"
                                                            style={{ color: green[500] }}
                                                            onClick={() =>
                                                                this.handleClick({
                                                                    editInProgress:
                                                                        idea.editInProgress,
                                                                    id: idea.id,
                                                                    content: idea.content,
                                                                })
                                                            }
                                                        >
                                                            <Save />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Cancel">
                                                        <IconButton
                                                            classes={{
                                                                root: classes.smallButton,
                                                            }}
                                                            variant="contained"
                                                            style={{ color: red[500] }}
                                                            onClick={() =>
                                                                cancelEdit({ id: idea.id })
                                                            }
                                                        >
                                                            <SettingsBackupRestore />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Fragment>
                                            )}
                                            {!idea.editInProgress && (
                                                <Fragment>
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            classes={{
                                                                root: classes.smallButton,
                                                            }}
                                                            variant="contained"
                                                            style={{ color: green[500] }}
                                                            onClick={() =>
                                                                this.handleClick({
                                                                    editInProgress:
                                                                        idea.editInProgress,
                                                                    id: idea.id,
                                                                })
                                                            }
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            classes={{
                                                                root: classes.smallButton,
                                                            }}
                                                            variant="contained"
                                                            style={{ color: red[500] }}
                                                            onClick={() =>
                                                                deleteIdea({ id: idea.id })
                                                            }
                                                        >
                                                            <Clear />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Fragment>
                                            )}
                                        </div>
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
