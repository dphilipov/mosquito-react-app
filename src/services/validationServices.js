function Auth(input) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let errors = {};

    // USERNAME VALIDATIONS
    if (!input.username.trim()) {
        errors.username = "Username can't be empty!"; // If username field is empty
    } else if (!emailRegex.test(input.username.trim())) {
        errors.username = "Invalid format!"; // If username in not is email format
    }

    // PASSOWORD VALIDATIONS
    if (!input.password.trim()) {
        errors.password = "Password can't be empty!"; // If password field is empty
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

function CRUD(input) {
    let errors = {};

    // TITLE VALIDATIONS
    if (!input.title.trim()) {
        errors.username = "Title can't be empty!"; // If title field is empty
    }

    // IMAGE URL VALIDATIONS
    if (!input.imgUrl.trim()) {
        errors.imgUrl = "Image URL can't be empty!"; // If image URL field is empty
    }

    // LATITUDE VALIDATIONS
    if (!input.lat.trim()) {
        errors.lat = "Latitude can't be empty!"; // If latitude field is empty
    } else if (isNaN(Number(input.lat))) {
        errors.lat = "Latitude must be a number!"; // If latitude in NaN
    }

    // LONGITUDE VALIDATIONS
    if (!input.lng.trim()) {
        errors.lng = "Longitude can't be empty!"; // If longitude field is empty
    } else if (isNaN(Number(input.lng))) {
        errors.lng = "Longitude must be a number!"; // If longitude in NaN
    }

    // DESCRIPTION VALIDATIONS
    if (input.description.trim().length < 30) {
        errors.description = "Description must be minimum 30 characters!"; // If description is less than 30 characters
    }

    return Object.keys(errors).length === 0 ? null : errors;
}

const validationServices = {
    Auth,
    CRUD
}

export default validationServices;