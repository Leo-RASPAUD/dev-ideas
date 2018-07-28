const listIdeas = `query GetEvent($count: Int = 10, $nextToken: String) {
    allIdeas(count: $count, nextToken: $nextToken) {
        ideas {
            id
            author
            content
            updatedOn
            createdOn
          }
          nextToken
    }
}`;

const addIdea = `mutation CreateEvent($content: String!) {
    addIdea(content: $content) {
        id
        content
        author
        createdOn
        updatedOn
    }
  }`;

const getIdea = `query GetEvent($id: String!) {
    getIdea(id: $id) {
    id
      content
      author
      createdOn
      updatedOn
    }
}`;

const updateIdea = `mutation CreateEvent($content: String!, $id: String!) {
    updateIdea(content: $content, id: $id) {
        id
        content
        author
        createdOn
        updatedOn
    }
  }`;

const deleteIdea = `mutation CreateEvent($id: String!) {
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
};
