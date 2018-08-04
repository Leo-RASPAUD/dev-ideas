const Idea = `
    id
    author
    content
    updatedOn
    createdOn
    votes
    updatedBy
`;

const subscribeToNewIdeas = `subscription subscribeToNewIdeas {
    addedIdea {
        ${Idea}
    }
}`;
const subscribeToDeleteIdea = `subscription subscribeToDeleteIdea {
    deletedIdea {
        ${Idea}
    }
}`;
const subscribeToUpvotedIdea = `subscription subscribeToUpvotedIdea {
    upvotedIdea {
        ${Idea}
    }
}`;
const subscribeToDownvotedIdea = `subscription subscribeToDownvotedIdea {
    downvotedIdea {
        ${Idea}
    }
}`;

export default {
    subscribeToNewIdeas,
    subscribeToDeleteIdea,
    subscribeToUpvotedIdea,
    subscribeToDownvotedIdea,
};
