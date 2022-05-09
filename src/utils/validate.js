

export const patternModel = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}/, // eslint-disable-line
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{6,}$/,
}


const ERROR_MESSAGE = {
    required: '*Please input the information!',
    pattern: '*Please input the information like format!',
    minMax: (min, max) => `Please input value from ${min}-${max} letter!`,
    min: (min) => `Please input value from ${min} letter!`,
    max: (max) => `Please input value less than ${max} letter!`,
}


const validateRequired = (value, rule) => {
    if (
        (typeof value === 'string' && !value.trim()) ||
        typeof value === 'undefined'
    ) {
        return rule.message || ERROR_MESSAGE.required
    }
}

const validateMinMax = (value, r) => {
    if (r.min && r.max && (value.length < r.min || value.length > r.max)) return r.message || ERROR_MESSAGE.minMax(r.min, r.max)
    if (r.min && value.length < r.min) return r.message || ERROR_MESSAGE.min(r.min)
    if (r.max && value.length > r.max) return r.message || ERROR_MESSAGE.max(r.max)
}

const validatePattern = (value, rule) => {
    let pattern = rule.pattern

    if (typeof pattern === 'string' && typeof patternModel[pattern] !== 'undefined') {
        pattern = patternModel[pattern]
    }

    if (pattern instanceof RegExp) {
        if (!pattern.test(value)) {
            return rule.message || ERROR_MESSAGE.pattern
        }
    }
}

// rules = {
//     name: [{ required: true, message: '' }, {pattern: 'email', message: '}],
//     email: [{ required: true, message: 'Email là trường bắt buộc truyền' }, { pattern: 'email', message: 'Email không đúng định dạng' }]
// }

// form = {
//     name: '',
//     email: ''
// }


const validate = (form, rules) => {
    let errorObj = {}
    for (let i in rules) {
        let error = undefined

        for (let j in rules[i]) {
            const r = rules[i][j]
            if (r.required) {
                error = validateRequired(form[i], r)
            } else if (r.pattern) {
                error = validatePattern(form[i], r)
            } else if (r.min || r.max) {
                error = validateMinMax(form[i], r)
            }

            if (error) {
                break;
            }
        }
        if (error) {
            errorObj[i] = error
        }
    }


    return errorObj
}

export default validate