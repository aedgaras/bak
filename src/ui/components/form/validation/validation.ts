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

    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        error = 'Email must be valid.';
    }

    return error;
}

export function validateRecipe(value: string) {
    let error: string = '';

    if (!value) {
        error = 'Recipe name is required!';
        return error;
    }

    return error;
}

export function validateRecipeDescriptiom(value: string) {
    let error: string = '';

    if (!value) {
        error = 'Recipe description is required!';
        return error;
    }

    return error;
}
