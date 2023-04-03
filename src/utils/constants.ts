import { AxiosRequestHeaders } from 'axios';
import { getJwtFromStorage } from './utils';

export const API_URL = 'http://localhost:5002';
export const ORGANIZATIONS_URL = '/organizations';
export const USERS_URL = '/Users';
export const AUTH_URL = '/Auth';

export const ACCESS_TOKEN_NAME = 'accessToken';
export const REFRESH_TOKEN_NAME = 'refreshToken';

export const axiosAuthHeaders: { headers: AxiosRequestHeaders } = {
    headers: {
        Authorization: 'Bearer ' + getJwtFromStorage ?? '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};
