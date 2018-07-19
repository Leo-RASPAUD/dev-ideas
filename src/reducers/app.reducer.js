const initialState = {
    user: {
        firstName: 'initialFirstName',
    },
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default appReducer;
