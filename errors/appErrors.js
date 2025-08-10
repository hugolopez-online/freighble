import { StatusCodes } from "http-status-codes";

class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFound";
        this.StatusCode = StatusCodes.NOT_FOUND;
    }
}

class NotAuthenticated extends Error {
    constructor(message) {
        super(message);
        this.name = "NotAuthenticated";
        this.StatusCode = StatusCodes.UNAUTHORIZED;
    }
}

class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.StatusCode = StatusCodes.BAD_REQUEST;
    }
}

class CredentialsTaken extends Error {
    constructor(message) {
        super(message);
        this.name = "CredentialsTaken";
        this.StatusCode = StatusCodes.CONFLICT;
    }
}

export { NotFound, NotAuthenticated, BadRequest, CredentialsTaken };
