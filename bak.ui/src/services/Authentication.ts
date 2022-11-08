import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { API_URL, JWT_NAME, REFRESH_TOKEN_NAME } from '../utils/constants';
import { Role } from '../utils/Models/Models';

interface User {
    username: string;
    role: Role;
}

export async function logout(): Promise<void> {
    localStorage.removeItem(JWT_NAME);
    localStorage.removeItem(REFRESH_TOKEN_NAME);
    window.location.assign('/');
}

export async function refreshToken() {
    await axios
        .post(
            API_URL + '/auth/refresh',
            {
                username: getCurrentUser()?.username,
                role: getCurrentUser()?.role,
            },
            { headers: { jwt: localStorage.getItem(REFRESH_TOKEN_NAME) ?? '' } }
        )
        .then((r: AxiosResponse<{ token: string }>) => {
            console.log(r);
            localStorage.setItem('bakJWT', r.data.token.split(' ')[1]);
            window.location.reload();
        });
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
