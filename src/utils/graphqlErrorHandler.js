const errorHandler = error => {
    if (error.errors && error.errors.length > 0) {
        return error.errors.map(internalError => internalError.message).join(', ');
    }
    return error;
};

export default errorHandler;
