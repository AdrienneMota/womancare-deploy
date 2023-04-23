import { ApplicationError } from "../protocols/error.protocol";

function tokenError(): ApplicationError{
    return {
        name: "tokenUnauthorized",
        message: "user unauthorizes"
    }
}

export default tokenError