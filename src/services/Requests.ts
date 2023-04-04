import axios, { AxiosResponse } from 'axios';
import {
    ANIMALS_URL,
    API_URL,
    AUTH_URL,
    axiosAuthHeaders,
    HEALTH_RECORDS_URL,
    ORGANIZATIONS_URL,
    USERS_URL,
} from '../utils/constants';
import {
    AnimalDto,
    HealthRecordDto,
    OrganizationDto,
    UserDto,
} from '../utils/dto';
import { TokenPayload } from '../utils/utils';

interface ListResponse<T> {
    paging: {
        listCount: number;
        currentPage: number;
        totalPages: number;
    };
    data: T;
}

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

export const getOrganizationList = async () => {
    const response = getRequest<ListResponse<OrganizationDto[]>>(
        ORGANIZATIONS_URL
    ).then((r: AxiosResponse<ListResponse<OrganizationDto[]>>) => {
        return r.data.data;
    });
    return response;
};

export const getUsersList = async () => {
    const response = await getRequest<UserDto[]>(USERS_URL).then(
        (r: AxiosResponse<UserDto[]>) => {
            return r.data;
        }
    );
    return response;
};

export const getAnimalsList = async () => {
    const response = await getRequest<AnimalDto[]>(ANIMALS_URL).then(
        (r: AxiosResponse<AnimalDto[]>) => {
            return r.data;
        }
    );
    return response;
};

export const getHealthRecordsList = async () => {
    const response = await getRequest<HealthRecordDto[]>(
        HEALTH_RECORDS_URL
    ).then((r: AxiosResponse<HealthRecordDto[]>) => {
        return r.data;
    });
    return response;
};

export const getUserById = async (id: string | undefined) => {
    const repsonse = await getRequest<UserDto>(USERS_URL + `/${id}`).then(
        (r) => {
            return r.data;
        }
    );
    return repsonse;
};

export const getUserByUsername = async (username: string | undefined) => {
    const response = await getRequest<UserDto>(
        USERS_URL + `/getByUsername/${username}`
    ).then((r: AxiosResponse<UserDto>) => {
        return r.data;
    });
    return response;
};

export const authenticate = async (
    endpoint: '/login' | '/register',
    payload: any
) => {
    const response = await postRequest<TokenPayload>(
        AUTH_URL + endpoint,
        payload
    );
    return response;
};
