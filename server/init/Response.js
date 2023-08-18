class ErrorResponse {

    constructor(statusCode, message, reason) {
        this.statusCode = statusCode;
        this.message = message;
        this.reason = reason;
    }
    
    errorObject() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            reason: this.reason,
        }

    }
}

module.exports = ErrorResponse;