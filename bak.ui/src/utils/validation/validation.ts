export function validateUsername(value: string) {
    let error: string = '';

    if (!value) {
        error = 'Username is required!';
        return error;
    }
    if (value.length < 4) {
        error = 'Minimum length is 4.';
        return error;
    }
    return error;
}

export function validatePassword(value: string) {
    let error: string = '';

    if (!value) {
        error = 'Password is required!';
        return error;
    }
    if (value.length < 4) {
        error = 'Minimum length is 4.';
        return error;
    }

    return error;
}

export function validateEmail(value: string) {
    let error: string = '';

    if (value.length < 4) {
        error = 'Minimum length is 4.';
        return error;
    }

    return error;
}
