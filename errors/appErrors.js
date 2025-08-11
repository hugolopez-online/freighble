import { StatusCodes } from "http-status-codes";

class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFound";
        this.StatusCode = StatusCodes.NOT_FOUND;
        this.errors = {
            database: {
                message,
            },
        };
    }
}

class NotAuthenticated extends Error {
    constructor(message) {
        super(message);
        this.name = "NotAuthenticated";
        this.StatusCode = StatusCodes.UNAUTHORIZED;
        this.errors = {
            auth: {
                message,
            },
        };
    }
}

class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.StatusCode = StatusCodes.BAD_REQUEST;
        this.errors = {
            req: {
                message,
            },
        };
    }
}

class NotSupported extends Error {
    constructor(message) {
        super(message);
        this.name = "NotSupported";
        this.StatusCode = StatusCodes.SERVICE_UNAVAILABLE;
        this.errors = {
            database: {
                message,
            },
        };
    }
}

export { NotFound, NotAuthenticated, BadRequest, NotSupported };
