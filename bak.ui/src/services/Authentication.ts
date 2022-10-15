import jwtDecode from 'jwt-decode';

export interface User {
    username: string;
    password: string;
}

export const JWT_NAME = 'bakJWT';

export async function logout(): Promise<void> {
    localStorage.removeItem(JWT_NAME);
    window.location.assign('/');
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
