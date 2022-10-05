import { useState } from 'react';

export const useLoading = (initialValue: true) => {
    const [value, setValue] = useState<boolean>(initialValue);
    const toggleLoading = () => setValue(!value);
    return [value, toggleLoading] as const;
};


export function validateUsername(value: string){
    let error;

    if (!value) {
        error =
            'Username is required!';
            return error;
    }
    if(value.length < 4) {
        error = 'Minimum length is 4.'
        return error;
    }
    return error;
}

export function validatePassword(value: string){
    let error;

    if (!value) {
        error =
            'Password is required!';
            return error;
    }
    if(value.length < 4) {
        error = 'Minimum length is 4.'
        return error;
    }
    return error;
}