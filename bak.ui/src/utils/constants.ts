import { getJwtFromStorage } from './utils';

export const API_URL = 'http://localhost:3030/api';

export const axiosAuthHeaders = {
    headers: {
        authorization: getJwtFromStorage() ?? '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};
