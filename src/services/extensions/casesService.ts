import { AxiosResponse } from 'axios';
import { CASES_URL } from '../../utils/constants';
import {
    AnimalDto,
    CaseDto,
    CreateCaseDto,
    UpdateCaseDto,
} from '../../utils/dto';
import { Service } from '../base';

export class CasesService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        const response = await this.api
            .getRequest<CaseDto[]>(CASES_URL)
            .then((r: AxiosResponse<CaseDto[]>) => {
                return r.data;
            });
        return response;
    };

    get = async (id: string) => {
        const response = await this.api
            .getRequest<CaseDto>(CASES_URL + '/' + id)
            .then((r: AxiosResponse<CaseDto>) => {
                return r.data;
            });
        return response;
    };

    getAnimalByCase = async (id: string) => {
        const response = await this.api
            .getRequest<AnimalDto>(CASES_URL + '/animal/' + id)
            .then((r: AxiosResponse<AnimalDto>) => {
                return r.data;
            });
        return response;
    };

    add = async (data: CreateCaseDto) => {
        const response = await this.api
            .postRequest(CASES_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    update = async (id: string, data: UpdateCaseDto) => {
        const response = await this.api
            .postRequest(CASES_URL + '/' + id, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    delete = async (id: number) => {
        const response = await this.api
            .deleteRequest(CASES_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };
}
