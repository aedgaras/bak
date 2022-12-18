import { getJwtFromStorage } from './utils';

export const API_URL = 'http://localhost:3030/api';
export const ORGANIZATIONS_URL = '/organizations';
export const USERS_URL = '/users';
export const AUTH_URL = '/auth';

export const JWT_NAME = 'bakJWT';
export const REFRESH_TOKEN_NAME = 'refreshJWT';

export const axiosAuthHeaders = {
    headers: {
        Authorization: 'Bearer: ' + getJwtFromStorage ?? '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};
