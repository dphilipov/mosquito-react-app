function validate(input) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let errors = {};

    // USERNAME VALIDATIONS
    if (!input.username.trim()) {
        errors.username = "Username can't be empty!"; // If username field in empty
    } else if (!emailRegex.test(input.username.trim())) {
        errors.username = "Invalid format!"; // If username in not in email format
    }

    // PASSOWORD VALIDATIONS
    if (!input.password.trim()) {
        errors.password = "Password can't be empty!"; // If password field in empty
    } else if (input.password.length < 6 || input.password.length > 32) {
        errors.password = "Password must be between 6 and 32 characters long!"; // If password is too short or too long
    }

    // REPEAT PASSOWORD VALIDATIONS
    if (!input.rePassword) return Object.keys(errors).length === 0 ? null : errors;; // If rePassword exists

    if (input.password !== input.rePassword) {
        errors.noMatch = "Passwords don't match"; // If passowords don't match
    }

    return Object.keys(errors).length === 0 ? null : errors;
}

export default validate;