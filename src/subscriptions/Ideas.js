const subscribeToNewIdeas = `subscription subscribeToNewIdeas {
    addedIdea {
        id
        content
        author
        createdOn
        updatedOn
    }
}`;
const subscribeToDeleteIdea = `subscription subscribeToDeleteIdea {
    deletedIdea {
        id
        content
        author
        createdOn
        updatedOn
    }
}`;

export default {
    subscribeToNewIdeas,
    subscribeToDeleteIdea,
};
