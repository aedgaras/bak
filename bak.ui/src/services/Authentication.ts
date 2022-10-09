import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

export interface User {
    username: string;
    password: string;
}

const JWT_NAME = 'bakJWT';

export async function loginToApi(params: User): Promise<User> {
    const response = await axios.post('/api/auth/login', params);

    console.log(response);

    return response.data.data;
}

export async function registerToApi(params: User): Promise<User> {
    const response = await axios.post('/api/auth/register', params);

    console.log(response);

    return response.data.data;
}

export async function logout() {
    localStorage.removeItem(JWT_NAME);
}

export const getCurrentUser = (): User | null => {
    const jwt = localStorage.getItem(JWT_NAME);

    if (!jwt) {
        return null;
    }
    const decodedJwt = jwtDecode<User>(jwt);

    return decodedJwt;
};
