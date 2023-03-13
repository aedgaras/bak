import {AxiosRequestHeaders} from 'axios';
import {getJwtFromStorage} from './utils';

export const API_URL = 'http://localhost:5001';
export const ORGANIZATIONS_URL = '/organizations';
export const USERS_URL = '/Users';
export const AUTH_URL = '/Auth';

export const JWT_NAME = 'token';
export const REFRESH_TOKEN_NAME = 'refreshJWT';

export const axiosAuthHeaders: { headers: AxiosRequestHeaders } = {
    headers: {
        Authorization: 'Bearer ' + getJwtFromStorage ?? '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};
