import { AxiosResponse } from 'axios';
import { RECIPES_URL } from '../../utils/constants';
import { CreateRecipeDto, MedicineRecipeDto } from '../../utils/dto';
import { Service } from '../base';

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
