/**
 * @param message ErrorResponse Message
 * @param statusCode ErrorResponse Code
 * @returns void {@link ErrorResponse}
 */
class ErrorResponse extends Error {
    statusCode: number;
    constructor(message:any, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ErrorResponse;