export const Validations = {
    username: {
        required: 'Username is required',
        minLength: {
            value: 5,
            message: 'Username should be at least 5 characters',
        },
        maxLength: {
            value: 20,
            message: 'Username should not exceed 20 characters',
        }},

    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password should be at least 8 characters',
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Password should include only letters and numbers, and at least have each of them',
        },
    }
}