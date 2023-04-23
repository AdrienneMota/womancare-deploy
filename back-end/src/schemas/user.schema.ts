import joi from "joi";

const userSchema = joi.object({
    "name": joi.string().max(250).required(),
    "user_name": joi.string().max(100).required(),
    "email": joi.string().email().max(100).required(),
    "password": joi.string().min(4).required(),
    "confirmPassword": joi.ref("password")
})

export default userSchema