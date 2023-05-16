import { AxiosResponse } from 'axios';
import { UserCreateDto, UserDto } from '../../types';
import { USERS_URL } from '../../utils/constants';
import { Service } from '../base';

export class UserService extends Service {
    /**
     *
     */
    constructor() {
        super();
    }

    getUserById = async (id: string | undefined) => {
        const repsonse = await this.api
            .getRequest<UserDto>(USERS_URL + `/${id}`)
            .then((r) => {
                return r.data;
            });
        return repsonse;
    };

    getUserByUsername = async (username: string | undefined) => {
        const response = await this.api
            .getRequest<UserDto>(USERS_URL + `/getByUsername/${username}`)
            .then((r: AxiosResponse<UserDto>) => {
                return r.data;
            });
        return response;
    };

    list = async () => {
        const response = await this.api
            .getRequest<UserDto[]>(USERS_URL)
            .then((r: AxiosResponse<UserDto[]>) => {
                return r.data;
            });
        return response;
    };

    add = async (user: UserCreateDto) => {
        const response = await this.api
            .postRequest<UserCreateDto>(USERS_URL, user)
            .then((r: AxiosResponse<UserCreateDto>) => {
                return r.data;
            });
        return response;
    };

    delete = async (id: number) => {
        const response = await this.api
            .deleteRequest(USERS_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };
}
