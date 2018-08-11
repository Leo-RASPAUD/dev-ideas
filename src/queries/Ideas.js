const Idea = `
    id
    author
    content
    updatedOn
    createdOn
    votes
    updatedBy
    isPublic
`;

const listIdeas = `query allIdeas($count: Int = 10, $nextToken: String, $author: String!) {
    allIdeas(count: $count, nextToken: $nextToken, author: $author) {
        ideas {
            ${Idea}
          }
        nextToken
    }
}`;

const addIdea = `mutation addIdea($content: String!, $email: String!) {
    addIdea(content: $content, email: $email) {
        ${Idea}
    }
  }`;

const getIdea = `query GetEvent($id: ID!) {
    getIdea(id: $id) {
        ${Idea}
    }
}`;

const updateIdea = `mutation updateIdea($content: String!, $id: ID!, $email: String!) {
    updateIdea(content: $content, id: $id, email: $email) {
        ${Idea}
    }
  }`;

const changeVisibility = `mutation changeVisibility($isPublic: Boolean!, $id: ID!, $email: String!) {
    changeVisibility(isPublic: $isPublic, id: $id, email: $email) {
        ${Idea}
    }
  }`;

const upvoteIdea = `mutation upvoteIdea($id: ID!, $email: String!) {
    upvoteIdea(id: $id, email: $email) {
        ${Idea}
    }
  }`;

const downvoteIdea = `mutation downvoteIdea($id: ID!, $email: String!) {
    downvoteIdea(id: $id, email: $email) {
        ${Idea}
    }
  }`;

const deleteIdea = `mutation deleteIdea($id: ID!) {
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
    changeVisibility,
};
