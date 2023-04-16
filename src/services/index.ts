import axios, { AxiosResponse } from 'axios';
import {
    ANIMALS_URL,
    API_URL,
    AUTH_URL,
    axiosAuthHeaders,
    CASES_URL,
    DIAGNOSIS_URL,
    HEALTH_RECORDS_URL,
    RECIPES_URL,
    REFRESH_TOKEN_NAME,
    RESULTS_URL,
    USERS_URL,
} from '../utils/constants';
import {
    AnimalDto,
    CaseDto,
    DiagnosisDto,
    HealthRecordDto,
    MedicineRecipeDto,
    ResultDto,
    UserDto,
} from '../utils/dto';
import {
    getJwtFromStorage,
    getRefreshTokenFromStorage,
    TokenPayload,
} from '../utils/utils';

class API {
    getRequest = async <T>(url: string): Promise<AxiosResponse<T, any>> => {
        return await axios.get<T>(API_URL + url, axiosAuthHeaders);
    };

    postRequest = async <T>(
        url: string,
        data: any
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

class Service {
    api: API;

    constructor() {
        this.api = new API();
    }
}

export class AuthService extends Service {
    constructor() {
        super();
    }

    authenticate = async (endpoint: '/login' | '/register', payload: any) => {
        const response = await this.api.postRequest<TokenPayload>(
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
    getUsersList = async () => {
        const response = await this.api
            .getRequest<UserDto[]>(USERS_URL)
            .then((r: AxiosResponse<UserDto[]>) => {
                return r.data;
            });
        return response;
    };
}

export class AnimalService extends Service {
    /**
     *
     */
    constructor() {
        super();
    }

    getAnimalsList = async () => {
        const response = await this.api
            .getRequest<AnimalDto[]>(ANIMALS_URL)
            .then((r: AxiosResponse<AnimalDto[]>) => {
                return r.data;
            });
        return response;
    };
}

export class HealthRecordService extends Service {
    constructor() {
        super();
    }

    getHealthRecordsList = async () => {
        const response = await this.api
            .getRequest<HealthRecordDto[]>(HEALTH_RECORDS_URL)
            .then((r: AxiosResponse<HealthRecordDto[]>) => {
                return r.data;
            });
        return response;
    };

    getHealthRecord = async (id: string) => {
        const response = await this.api
            .getRequest<HealthRecordDto>(HEALTH_RECORDS_URL + '/' + id)
            .then((r: AxiosResponse<HealthRecordDto>) => {
                return r.data;
            });
        return response;
    };

    getHealthRecordsContactInfo = async (id: string) => {
        const response = await this.api
            .getRequest<UserDto>(HEALTH_RECORDS_URL + '/contact/' + id)
            .then((r: AxiosResponse<UserDto>) => {
                return r.data;
            });
        return response;
    };
}

export class CasesService extends Service {
    constructor() {
        super();
    }

    getCaseList = async () => {
        const response = await this.api
            .getRequest<CaseDto[]>(CASES_URL)
            .then((r: AxiosResponse<CaseDto[]>) => {
                return r.data;
            });
        return response;
    };
}

export class DiagnosisService extends Service {
    constructor() {
        super();
    }

    getDiagnosisList = async () => {
        const response = await this.api
            .getRequest<DiagnosisDto[]>(DIAGNOSIS_URL)
            .then((r: AxiosResponse<DiagnosisDto[]>) => {
                return r.data;
            });
        return response;
    };
}

export class ResultsService extends Service {
    constructor() {
        super();
    }

    getResultsList = async () => {
        const response = await this.api
            .getRequest<ResultDto[]>(RESULTS_URL)
            .then((r: AxiosResponse<ResultDto[]>) => {
                return r.data;
            });
        return response;
    };
}

export class RecipeService extends Service {
    constructor() {
        super();
    }

    getRecipesList = async () => {
        const response = await this.api
            .getRequest<MedicineRecipeDto[]>(RECIPES_URL)
            .then((r: AxiosResponse<MedicineRecipeDto[]>) => {
                return r.data;
            });

        return response;
    };
}
