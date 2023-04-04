import axios, { AxiosResponse } from 'axios';
import {
    ANIMALS_URL,
    API_URL,
    AUTH_URL,
    axiosAuthHeaders,
    HEALTH_RECORDS_URL,
    REFRESH_TOKEN_NAME,
    USERS_URL,
} from '../utils/constants';
import { AnimalDto, HealthRecordDto, UserDto } from '../utils/dto';
import {
    getJwtFromStorage,
    getRefreshTokenFromStorage,
    TokenPayload,
} from '../utils/utils';

export const getRequest = async <T>(
    url: string
): Promise<AxiosResponse<T, any>> => {
    return await axios.get<T>(API_URL + url, axiosAuthHeaders);
};

export const postRequest = async <T>(
    url: string,
    data: any
): Promise<AxiosResponse<T, any>> => {
    return await axios.post<T>(API_URL + url, data, axiosAuthHeaders);
};

export const putRequest = async <T>(
    url: string,
    data: any
): Promise<AxiosResponse<T, any>> => {
    return await axios.put<T>(API_URL + url, data, axiosAuthHeaders);
};

export const deleteRequest = async <T>(
    url: string
): Promise<AxiosResponse<T, any>> => {
    return await axios.delete<T>(API_URL + url, axiosAuthHeaders);
};

export class API {
    getUsersList = async () => {
        const response = await getRequest<UserDto[]>(USERS_URL).then(
            (r: AxiosResponse<UserDto[]>) => {
                return r.data;
            }
        );
        return response;
    };

    getAnimalsList = async () => {
        const response = await getRequest<AnimalDto[]>(ANIMALS_URL).then(
            (r: AxiosResponse<AnimalDto[]>) => {
                return r.data;
            }
        );
        return response;
    };

    getHealthRecordsList = async () => {
        const response = await getRequest<HealthRecordDto[]>(
            HEALTH_RECORDS_URL
        ).then((r: AxiosResponse<HealthRecordDto[]>) => {
            return r.data;
        });
        return response;
    };

    getUserById = async (id: string | undefined) => {
        const repsonse = await getRequest<UserDto>(USERS_URL + `/${id}`).then(
            (r) => {
                return r.data;
            }
        );
        return repsonse;
    };

    getUserByUsername = async (username: string | undefined) => {
        const response = await getRequest<UserDto>(
            USERS_URL + `/getByUsername/${username}`
        ).then((r: AxiosResponse<UserDto>) => {
            return r.data;
        });
        return response;
    };

    authenticate = async (endpoint: '/login' | '/register', payload: any) => {
        const response = await postRequest<TokenPayload>(
            AUTH_URL + endpoint,
            payload
        );
        return response;
    };

    refreshToken = async () => {
        await axios
            .post(
                API_URL + '/Token/refresh',
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
