import axios, { AxiosResponse } from 'axios';
import { API_URL, axiosAuthHeaders } from '../../utils/constants';

class API {
    getRequest = async <T>(url: string): Promise<AxiosResponse<T, any>> => {
        return await axios.get<T>(API_URL + url, axiosAuthHeaders);
    };

    postRequest = async <T>(
        url: string,
        data?: any
    ): Promise<AxiosResponse<T, any>> => {
        return await axios.post<T>(API_URL + url, data, axiosAuthHeaders);
    };

    putRequest = async <T>(
        url: string,
        data: any
    ): Promise<AxiosResponse<T, any>> => {
        return await axios.put<T>(API_URL + url, data, axiosAuthHeaders);
    };

    deleteRequest = async <T>(url: string): Promise<AxiosResponse<T, any>> => {
        return await axios.delete<T>(API_URL + url, axiosAuthHeaders);
    };
}

export class Service {
    api: API;

    constructor() {
        this.api = new API();
    }
}
