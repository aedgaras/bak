import axios from 'axios';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export interface User {
    username: string;
    password: string;
}

const JWT_NAME = 'bakJWT';

export async function login(params: User): Promise<User> {
    const response = await axios.post('/api/sessions', params);

    return response.data.data;
}

export async function logout() {
    localStorage.removeItem(JWT_NAME);
}

export const getCurrentUser() {
    const jwt = localStorage.getItem(JWT_NAME);

    if(!jwt){
        return null;
    }

}