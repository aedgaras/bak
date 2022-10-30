import { getJwtFromStorage } from './utils';

export const API_URL = 'http://localhost:3030/api';

export const axiosAuthHeaders = {
    headers: {
        Authorization: 'Bearer: ' + getJwtFromStorage ?? '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};
