import { AxiosResponse } from 'axios';
import {
    AnimalDto,
    CaseDto,
    CreateResultDto,
    ResultDto,
    UpdateResultDto,
} from '../../types';
import { RESULTS_URL } from '../../utils/constants';
import { Service } from '../base';

export class ResultsService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        return await this.api
            .getRequest<ResultDto[]>(RESULTS_URL)
            .then((r: AxiosResponse<ResultDto[]>) => {
                return r.data;
            });
    };

    get = async (id: string) => {
        return await this.api
            .getRequest<ResultDto>(RESULTS_URL + '/' + id)
            .then((r: AxiosResponse<ResultDto>) => {
                return r.data;
            });
    };
    getUserResults = async (id: string) => {
        return await this.api
            .getRequest<ResultDto[]>(RESULTS_URL + '/user/' + id)
            .then((r: AxiosResponse<ResultDto[]>) => {
                return r.data;
            });
    };

    getAnimal = async (id: string) => {
        return await this.api
            .getRequest<AnimalDto>(RESULTS_URL + '/animal/' + id)
            .then((r: AxiosResponse<AnimalDto>) => {
                return r.data;
            });
    };

    getCase = async (id: string) => {
        return await this.api
            .getRequest<CaseDto>(RESULTS_URL + '/case/' + id)
            .then((r: AxiosResponse<CaseDto>) => {
                return r.data;
            });
    };

    update = async (id: string, data: UpdateResultDto) => {
        return await this.api
            .postRequest(RESULTS_URL + '/' + id, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };

    add = async (data: CreateResultDto) => {
        return await this.api
            .postRequest(RESULTS_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };

    delete = async (id: number) => {
        return await this.api
            .deleteRequest(RESULTS_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };
}
