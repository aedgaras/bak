import { AxiosResponse } from 'axios';
import { RESULTS_URL } from '../../utils/constants';
import {
    AnimalDto,
    CaseDto,
    CreateResultDto,
    ResultDto,
} from '../../utils/dto';
import { Service } from '../base';

export class ResultsService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        const response = await this.api
            .getRequest<ResultDto[]>(RESULTS_URL)
            .then((r: AxiosResponse<ResultDto[]>) => {
                return r.data;
            });
        return response;
    };

    get = async (id: string) => {
        const response = await this.api
            .getRequest<ResultDto>(RESULTS_URL + '/' + id)
            .then((r: AxiosResponse<ResultDto>) => {
                return r.data;
            });

        return response;
    };
    getUserResults = async (id: string) => {
        const response = await this.api
            .getRequest<ResultDto[]>(RESULTS_URL + '/user/' + id)
            .then((r: AxiosResponse<ResultDto[]>) => {
                return r.data;
            });

        return response;
    };

    getAnimal = async (id: string) => {
        const response = await this.api
            .getRequest<AnimalDto>(RESULTS_URL + '/animal/' + id)
            .then((r: AxiosResponse<AnimalDto>) => {
                return r.data;
            });

        return response;
    };

    getCase = async (id: string) => {
        const response = await this.api
            .getRequest<CaseDto>(RESULTS_URL + '/case/' + id)
            .then((r: AxiosResponse<CaseDto>) => {
                return r.data;
            });

        return response;
    };

    add = async (data: CreateResultDto) => {
        const response = await this.api
            .postRequest(RESULTS_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    delete = async (id: number) => {
        const response = await this.api
            .deleteRequest(RESULTS_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };
}
