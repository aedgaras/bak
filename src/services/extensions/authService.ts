import axios, { AxiosResponse } from 'axios';
import {
    ChangePasswordDto,
    UpdateProfileDto,
    UserRegisterDto,
} from '../../types';
import { API_URL, AUTH_URL, REFRESH_TOKEN_NAME } from '../../utils/constants';
import {
    TokenPayload,
    getJwtFromStorage,
    getRefreshTokenFromStorage,
} from '../../utils/utils';
import { Service } from '../base';

export class AuthService extends Service {
    constructor() {
        super();
    }

    register = async (user: UserRegisterDto) => {
        const response = await this.api
            .postRequest<TokenPayload>(AUTH_URL + '/register', user)
            .then((r: AxiosResponse<TokenPayload>) => {
                return r.data;
            });
        return response;
    };

    authenticate = async (endpoint: '/login' | '/register', payload: any) => {
        const response = await this.api.postRequest<TokenPayload>(
            AUTH_URL + endpoint,
            payload
        );
        return response;
    };

    profile = async (id: string, data: UpdateProfileDto) => {
        await this.api
            .postRequest<TokenPayload>(AUTH_URL + '/profile/' + id, data)
            .then(
                (
                    r: AxiosResponse<{
                        accessToken: string;
                        refreshToken: string;
                    }>
                ) => {
                    localStorage.setItem('accessToken', r.data.accessToken);
                    localStorage.setItem('refreshToken', r.data.refreshToken);
                    window.location.reload();
                }
            );
    };

    changePassword = async (id: string, data: ChangePasswordDto) => {
        await this.api
            .postRequest<TokenPayload>(AUTH_URL + '/changePassword/' + id, data)
            .then(
                (
                    r: AxiosResponse<{
                        accessToken: string;
                        refreshToken: string;
                    }>
                ) => {
                    localStorage.setItem('accessToken', r.data.accessToken);
                    localStorage.setItem('refreshToken', r.data.refreshToken);
                    window.location.reload();
                }
            );
    };

    refreshToken = async () => {
        await axios
            .post(API_URL + '/Token/refresh', {
                AccessToken: getJwtFromStorage,
                RefreshToken: getRefreshTokenFromStorage,
            })
            .then(
                (
                    r: AxiosResponse<{
                        accessToken: string;
                        refreshToken: string;
                    }>
                ) => {
                    localStorage.setItem('accessToken', r.data.accessToken);
                    localStorage.setItem('refreshToken', r.data.refreshToken);
                    window.location.reload();
                }
            );
    };

    logout = async () => {
        await axios
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
    };
}
