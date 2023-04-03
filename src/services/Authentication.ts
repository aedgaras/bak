import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import {
    ACCESS_TOKEN_NAME,
    API_URL,
    REFRESH_TOKEN_NAME,
} from '../utils/constants';
import { Classification, Role } from '../utils/Models';
import { getJwtFromStorage, getRefreshTokenFromStorage } from '../utils/utils';

interface User {
    sub: string;
    role: Role;
    classifaction: Classification;
}

export async function logout(): Promise<void> {
    const r = await axios
        .post(
            API_URL + '/Token/revoke',
            {
                AccessToken: getJwtFromStorage,
                RefreshToken: getRefreshTokenFromStorage,
            },
            {
                headers: {
                    jwt: localStorage.getItem(REFRESH_TOKEN_NAME) ?? '',
                },
            }
        )
        .then((r) => {
            return r;
        });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.assign('/');
}

export async function refreshToken() {
    await axios
        .post(
            API_URL + '/Token/refresh',
            {
                AccessToken: getJwtFromStorage,
                RefreshToken: getRefreshTokenFromStorage,
            },
            { headers: { jwt: localStorage.getItem(REFRESH_TOKEN_NAME) ?? '' } }
        )
        .then(
            (
                r: AxiosResponse<{ accessToken: string; refreshToken: string }>
            ) => {
                localStorage.setItem('accessToken', r.data.accessToken);
                localStorage.setItem('refreshToken', r.data.refreshToken);
                window.location.reload();
            }
        );
}

export function getCurrentUser(): User | null {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
    const refreshToken = localStorage.getItem(ACCESS_TOKEN_NAME);

    if (!accessToken || !refreshToken) {
        return null;
    }

    const decodedAccessToken = jwtDecode<{ iat: number; exp: number }>(
        accessToken
    );
    const decodedRefreshToken = jwtDecode<{ iat: number; exp: number }>(
        refreshToken
    );

    if (
        decodedAccessToken.iat > decodedAccessToken.exp ||
        decodedRefreshToken.iat > decodedRefreshToken.exp
    ) {
        logout();
        return null;
    }

    const decodedUserJwt = jwtDecode<User>(accessToken);

    return decodedUserJwt;
}
