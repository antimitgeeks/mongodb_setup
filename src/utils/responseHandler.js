function sendSuccess(res, data) {
    res.status(200).json({ success: true, data });
}

function sendError(res, statusCode, message) {
    res.status(statusCode).json({ success: false, error: { message } });
}

module.exports = {
    sendSuccess,
    sendError
}