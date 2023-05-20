import { AxiosResponse } from 'axios';
import { AnimalDto, CreateAnimalDto, UpdateAnimalDto } from '../../types';
import { ANIMALS_URL } from '../../utils/constants';
import { Service } from '../base';

export class AnimalService extends Service {
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
