import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { API_URL, JWT_NAME, REFRESH_TOKEN_NAME } from '../utils/constants';
import { Classification, Role } from '../utils/Models';
import { getJwtFromStorage, getRefreshTokenFromStorage } from '../utils/utils';

interface User {
    sub: string;
    role: Role;
    classifaction: Classification;
}

export async function logout(): Promise<void> {
    localStorage.removeItem(JWT_NAME);
    localStorage.removeItem(REFRESH_TOKEN_NAME);
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
                localStorage.setItem('token', r.data.accessToken.split(' ')[1]);
                localStorage.setItem(
                    'refreshJWT',
                    r.data.refreshToken.split(' ')[1]
                );
                window.location.reload();
            }
        );
}

export function getCurrentUser(): User | null {
    const jwt = localStorage.getItem(JWT_NAME);

    if (!jwt) {
        return null;
    }
    const decodedJwt = jwtDecode<{ iat: number; exp: number }>(jwt);
    if (decodedJwt.iat > decodedJwt.exp) {
        logout();
        return null;
    }

    const decodedUserJwt = jwtDecode<User>(jwt);

    return decodedUserJwt;
}
