import { AxiosResponse } from 'axios';
import { CreateRecipeDto, RecipeDto, UpdateRecipeDto } from '../../types';
import { RECIPES_URL } from '../../utils/constants';
import { Service } from '../base';

export class RecipeService extends Service {
    constructor() {
        super();
    }

    list = async () => {
        return await this.api
            .getRequest<RecipeDto[]>(RECIPES_URL)
            .then((r: AxiosResponse<RecipeDto[]>) => {
                return r.data;
            });
    };

    get = async (id: string) => {
        return await this.api
            .getRequest<RecipeDto>(RECIPES_URL + '/' + id)
            .then((r: AxiosResponse<RecipeDto>) => {
                return r.data;
            });
    };
    getUserRecipes = async (id: string) => {
        return await this.api
            .getRequest<RecipeDto[]>(RECIPES_URL + '/user/' + id)
            .then((r: AxiosResponse<RecipeDto[]>) => {
                return r.data;
            });
    };

    update = async (id: string, data: UpdateRecipeDto) => {
        return await this.api
            .postRequest(RECIPES_URL + '/' + id, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };

    add = async (data: CreateRecipeDto) => {
        return await this.api
            .postRequest(RECIPES_URL, data)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };

    delete = async (id: number) => {
        return await this.api
            .deleteRequest(RECIPES_URL + '/' + id)
            .then((r: AxiosResponse) => {
                return r.data;
            });
    };
}
