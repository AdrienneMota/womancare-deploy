import { ApplicationError } from "../protocols/error.protocol";

function userUnauthorizedError(): ApplicationError{
    return {
        name: "UserUnauthorized",
        message: "email or password are incorrect."
    }
}

export default userUnauthorizedError