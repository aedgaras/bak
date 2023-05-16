import { AxiosResponse } from 'axios';
import { DIAGNOSIS_URL } from '../../utils/constants';
import { CreateDiagnosisDto, DiagnosisDto } from '../../utils/dto';
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
        const response = await this.api
            .getRequest<DiagnosisDto>(DIAGNOSIS_URL + '/' + id)
            .then((r: AxiosResponse<DiagnosisDto>) => {
                return r.data;
            });

        return response;
    };

    getUserDiagnoses = async (id: string) => {
        const response = await this.api
            .getRequest<DiagnosisDto[]>(DIAGNOSIS_URL + '/user/' + id)
            .then((r: AxiosResponse<DiagnosisDto[]>) => {
                return r.data;
            });

        return response;
    };

    add = async (data: CreateDiagnosisDto) => {
        const response = await this.api
            .postRequest(DIAGNOSIS_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    delete = async (id: number) => {
        const response = await this.api
            .deleteRequest(DIAGNOSIS_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };
}
