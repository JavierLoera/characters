export const errorHandler = (error, req, res, next) => {
    const errStatus = error.status || 500;
    const errMsg = error.message || 'Error de servidor';
    res.status(errStatus).json({ "message": errMsg, status: errStatus })
}


export const ExceptionHandler = (message, statusCode) => {
    const error = new Error(message);
    error.status = statusCode || 500;
    error.error = true;
    return error
}