import { AxiosResponse } from 'axios';
import {
    AnimalDto,
    CreateHealthRecordDto,
    HealthRecordDto,
    UpdateHealthRecordDto,
    UserDto,
} from '../../types';
import { HEALTH_RECORDS_URL } from '../../utils/constants';
import { Service } from '../base';

export class HealthRecordService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        const response = await this.api
            .getRequest<HealthRecordDto[]>(HEALTH_RECORDS_URL)
            .then((r: AxiosResponse<HealthRecordDto[]>) => {
                return r.data;
            });
        return response;
    };

    get = async (id: string) => {
        const response = await this.api
            .getRequest<HealthRecordDto>(HEALTH_RECORDS_URL + '/' + id)
            .then((r: AxiosResponse<HealthRecordDto>) => {
                return r.data;
            });
        return response;
    };

    getLatestAnimalHealthRecord = async (id: string) => {
        return await this.api
            .getRequest<HealthRecordDto>(
                HEALTH_RECORDS_URL + '/latestAnimalRecord/' + id
            )
            .then((r: AxiosResponse<HealthRecordDto>) => {
                return r.data;
            });
    };

    getUserHealthRecords = async (id: string) => {
        const response = await this.api
            .getRequest<HealthRecordDto[]>(HEALTH_RECORDS_URL + '/user/' + id)
            .then((r: AxiosResponse<HealthRecordDto[]>) => {
                return r.data;
            });

        return response;
    };

    add = async (data: CreateHealthRecordDto) => {
        const response = await this.api
            .postRequest(HEALTH_RECORDS_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    update = async (id: string, healthRecordDto: UpdateHealthRecordDto) => {
        const response = await this.api
            .postRequest<UpdateHealthRecordDto>(
                HEALTH_RECORDS_URL + '/' + id,
                healthRecordDto
            )
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    getHealthRecordAnimal = async (id: string) => {
        const response = await this.api
            .getRequest<AnimalDto>(HEALTH_RECORDS_URL + '/animal/' + id)
            .then((r: AxiosResponse<AnimalDto>) => {
                return r.data;
            });
        return response;
    };

    getAnimalHealthRecords = async (id: string) => {
        return await this.api
            .getRequest<HealthRecordDto[]>(
                HEALTH_RECORDS_URL + '/animal/all/' + id
            )
            .then((r) => {
                return r.data;
            });
    };

    getHealthRecordsContactInfo = async (id: string) => {
        const response = await this.api
            .getRequest<UserDto>(HEALTH_RECORDS_URL + '/contact/' + id)
            .then((r: AxiosResponse<UserDto>) => {
                return r.data;
            });
        return response;
    };

    delete = async (id: number) => {
        const response = await this.api
            .deleteRequest(HEALTH_RECORDS_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };
}
