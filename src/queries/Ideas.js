const Idea = `
    id
    author
    content
    updatedOn
    createdOn
    votes
    updatedBy
`;

const listIdeas = `query GetEvent($count: Int = 10, $nextToken: String) {
    allIdeas(count: $count, nextToken: $nextToken) {
        ideas {
            ${Idea}
          }
        nextToken
    }
}`;

const addIdea = `mutation CreateEvent($content: String!, $email: String!) {
    addIdea(content: $content, email: $email) {
        ${Idea}
    }
  }`;

const getIdea = `query GetEvent($id: ID!) {
    getIdea(id: $id) {
        ${Idea}
    }
}`;

const updateIdea = `mutation CreateEvent($content: String!, $id: ID!, $email: String!) {
    updateIdea(content: $content, id: $id, email: $email) {
        ${Idea}
    }
  }`;

const upvoteIdea = `mutation CreateEvent($id: ID!, $email: String!) {
    upvoteIdea(id: $id, email: $email) {
        ${Idea}
    }
  }`;

const downvoteIdea = `mutation CreateEvent($id: ID!, $email: String!) {
    downvoteIdea(id: $id, email: $email) {
        ${Idea}
    }
  }`;

const deleteIdea = `mutation CreateEvent($id: ID!) {
    deleteIdea(id: $id) {
        id
    }
}`;

export default {
    listIdeas,
    addIdea,
    getIdea,
    deleteIdea,
    updateIdea,
    upvoteIdea,
    downvoteIdea,
};
