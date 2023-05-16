import { AxiosResponse } from 'axios';
import { CreateDiagnosisDto, DiagnosisDto } from '../../types';
import { DIAGNOSIS_URL } from '../../utils';
import { Service } from '../base';

export class DiagnosisService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        return await this.api
            .getRequest<DiagnosisDto[]>(DIAGNOSIS_URL)
            .then((r: AxiosResponse<DiagnosisDto[]>) => {
                return r.data;
            });
    };

    get = async (id: string) => {
        return await this.api
            .getRequest<DiagnosisDto>(DIAGNOSIS_URL + '/' + id)
            .then((r: AxiosResponse<DiagnosisDto>) => {
                return r.data;
            });
    };

    getUserDiagnoses = async (id: string) => {
        return await this.api
            .getRequest<DiagnosisDto[]>(DIAGNOSIS_URL + '/user/' + id)
            .then((r: AxiosResponse<DiagnosisDto[]>) => {
                return r.data;
            });
    };

    add = async (data: CreateDiagnosisDto) => {
        return await this.api
            .postRequest(DIAGNOSIS_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };

    delete = async (id: number) => {
        return await this.api
            .deleteRequest(DIAGNOSIS_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };
}
