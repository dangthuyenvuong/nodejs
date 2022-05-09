import { BAD_REQUEST } from "../config/status_code.js"
import validate from "../utils/validate.js"

export const yup = (rules) => {
    return (req, res, next) => {
        const body = { ...req.query, ...req.body }
        const errors = validate(body, rules)
        if (Object.keys(errors).length > 0) {
            return res.status(BAD_REQUEST).json({ errors, error_message: 'validate failed!' })
        }
        next()
    }
}