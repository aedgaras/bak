import axios, { AxiosError } from "axios";

type Response<T> = {
    code: string;
    data: T | undefined;
}

export async function get<T>(url:string){
    try{
        return await axios.get<T>(url).then((r) => {});
    } catch (e){
        if(axios.isAxiosError(e)){
            console.log(e);
        }
    }
};

export async function post<T>(url:string){
    try{
        return await axios.get<T>(url).then((r) => {});
    } catch (e){
        if(axios.isAxiosError(e)){
            console.log(e);
        }
    }
};

export async function put<T>(url:string){
    try{
        return await axios.get<T>(url).then((r) => {});
    } catch (e){
        if(axios.isAxiosError(e)){
            console.log(e);
        }
    }
};

export async function patch<T>(url:string){
    try{
        return await axios.get<T>(url).then((r) => {});
    } catch (e){
        if(axios.isAxiosError(e)){
            console.log(e);
        }
    }
};

export async function remove<T>(url:string){
    try{
        return await axios.get<T>(url).then((r) => {});
    } catch (e){
        if(axios.isAxiosError(e)){
            console.log(e);
        }
    }
};