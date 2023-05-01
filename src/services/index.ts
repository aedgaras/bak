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
    CreateAnimalDto,
    CreateCaseDto,
    CreateDiagnosisDto,
    CreateHealthRecordDto,
    CreateRecipeDto,
    CreateResultDto,
    DiagnosisDto,
    HealthRecordDto,
    MedicineRecipeDto,
    ResultDto,
    UpdateAnimalDto,
    UpdateCaseDto,
    UpdateHealthRecordDto,
    UserDto,
    UserRegisterDto,
    ViewHistoryDto,
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

    register = async (user: UserRegisterDto) => {
        const response = await this.api
            .postRequest<TokenPayload>(AUTH_URL + '/register', user)
            .then((r: AxiosResponse<TokenPayload>) => {
                return r.data;
            });
        return response;
    };

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

    list = async () => {
        const response = await this.api
            .getRequest<UserDto[]>(USERS_URL)
            .then((r: AxiosResponse<UserDto[]>) => {
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

export class AnimalService extends Service {
    /**
     *
     */
    constructor() {
        super();
    }

    list = async () => {
        const response = await this.api
            .getRequest<AnimalDto[]>(ANIMALS_URL)
            .then((r: AxiosResponse<AnimalDto[]>) => {
                return r.data;
            });
        return response;
    };

    get = async (id: string) => {
        const response = await this.api
            .getRequest<AnimalDto>(ANIMALS_URL + '/' + id)
            .then((r: AxiosResponse<AnimalDto>) => {
                return r.data;
            });

        return response;
    };

    getUserAnimals = async (id: string) => {
        const response = await this.api
            .getRequest<AnimalDto[]>(ANIMALS_URL + '/user/' + id)
            .then((r: AxiosResponse<AnimalDto[]>) => {
                return r.data;
            });

        return response;
    };

    add = async (animalDto: CreateAnimalDto) => {
        const response = await this.api
            .postRequest<AnimalDto>(ANIMALS_URL, animalDto)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    update = async (id: string, animalDto: UpdateAnimalDto) => {
        const response = await this.api
            .postRequest<AnimalDto>(ANIMALS_URL + '/' + id, animalDto)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    delete = async (id: number) => {
        const response = await this.api
            .deleteRequest(ANIMALS_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };
}

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

export class DiagnosisService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        const response = await this.api
            .getRequest<DiagnosisDto[]>(DIAGNOSIS_URL)
            .then((r: AxiosResponse<DiagnosisDto[]>) => {
                return r.data;
            });
        return response;
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

export class RecipeService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        const response = await this.api
            .getRequest<MedicineRecipeDto[]>(RECIPES_URL)
            .then((r: AxiosResponse<MedicineRecipeDto[]>) => {
                return r.data;
            });

        return response;
    };

    get = async (id: string) => {
        const response = await this.api
            .getRequest<MedicineRecipeDto>(RECIPES_URL + '/' + id)
            .then((r: AxiosResponse<MedicineRecipeDto>) => {
                return r.data;
            });

        return response;
    };
    getUserRecipes = async (id: string) => {
        const response = await this.api
            .getRequest<MedicineRecipeDto[]>(RECIPES_URL + '/user/' + id)
            .then((r: AxiosResponse<MedicineRecipeDto[]>) => {
                return r.data;
            });

        return response;
    };

    add = async (data: CreateRecipeDto) => {
        const response = await this.api
            .postRequest(RECIPES_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };

    delete = async (id: number) => {
        const response = await this.api
            .deleteRequest(RECIPES_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
        return response;
    };
}

export class HistoryService extends Service {
    constructor() {
        super();
    }

    HISTORY_URL = '/ViewHistory';

    listRequestedHisories = async () => {
        const response = await this.api
            .getRequest<ViewHistoryDto[]>(this.HISTORY_URL)
            .then((r: AxiosResponse<ViewHistoryDto[]>) => {
                return r.data;
            });

        return response;
    };

    requestHisory = async () => {
        const response = await this.api
            .postRequest<ViewHistoryDto[]>(this.HISTORY_URL + '/requestHistory')
            .then((r: AxiosResponse<ViewHistoryDto[]>) => {
                return r.data;
            });

        return response;
    };

    permissionToViewHisory = async (id: string) => {
        const response = await this.api
            .postRequest<ViewHistoryDto[]>(
                this.HISTORY_URL + '/permissionToViewHistory/' + id
            )
            .then((r: AxiosResponse<ViewHistoryDto[]>) => {
                return r.data;
            });

        return response;
    };

    viewHisory = async () => {
        const response = await this.api
            .getRequest<ViewHistoryDto[]>(this.HISTORY_URL + '/myHistory')
            .then((r: AxiosResponse<ViewHistoryDto[]>) => {
                return r.data;
            });

        return response;
    };
}
