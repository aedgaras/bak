import axios, { AxiosResponse } from "axios";
import {
  API_URL,
  AUTH_URL,
  axiosAuthHeaders,
  ORGANIZATIONS_URL,
  USERS_URL,
} from "../utils/constants";
import { OrganizationDto, UserModel } from "../utils/dto";
import { TokenPayload } from "../utils/utils";

interface ListResponse<T> {
  paging: {
    listCount: number;
    currentPage: number;
    totalPages: number;
  };
  data: T;
}

export const getRequest = async <T>(
  url: string
): Promise<AxiosResponse<T, any>> => {
  return await axios.get<T>(API_URL + url, axiosAuthHeaders);
};

export const postRequest = async <T>(
  url: string,
  data: any
): Promise<AxiosResponse<T, any>> => {
  return await axios.post<T>(API_URL + url, data, axiosAuthHeaders);
};

export const putRequest = async <T>(
  url: string,
  data: any
): Promise<AxiosResponse<T, any>> => {
  return await axios.put<T>(API_URL + url, data, axiosAuthHeaders);
};

export const deleteRequest = async <T>(
  url: string
): Promise<AxiosResponse<T, any>> => {
  return await axios.delete<T>(API_URL + url, axiosAuthHeaders);
};

export const getOrganizationList = async () => {
  const response = getRequest<ListResponse<OrganizationDto[]>>(
    ORGANIZATIONS_URL
  ).then((r: AxiosResponse<ListResponse<OrganizationDto[]>>) => {
    return r.data.data;
  });
  return response;
};

export const getUsersList = async () => {
  const response = await getRequest<UserModel[]>(USERS_URL).then(
    (r: AxiosResponse<UserModel[]>) => {
      return r.data;
    }
  );
  return response;
};

export const getUserById = async (id: string | undefined) => {
  const repsonse = await getRequest<UserModel>(USERS_URL + `/${id}`).then(
    (r) => {
      return r.data;
    }
  );
  return repsonse;
};

export const getUserByUsername = async (username: string | undefined) => {
  const response = await getRequest<UserModel>(
    USERS_URL + `/getByUsername/${username}`
  ).then((r: AxiosResponse<UserModel>) => {
    return r.data;
  });
  return response;
};

export const getOrganizationByID = async (orgId: string | undefined) => {
  const response = await getRequest<OrganizationDto>(
    ORGANIZATIONS_URL + `/${orgId}`
  ).then((r) => {
    return r.data;
  });
  return response;
};

export const getOrganizationMembers = async (orgId: string | undefined) => {
  const response = await getRequest<ListResponse<UserModel[]>>(
    ORGANIZATIONS_URL + `/members/${orgId}`
  ).then((r) => {
    return r.data;
  });
  return response;
};

export const authenticate = async (
  endpoint: "/login" | "/register",
  payload: any
) => {
  const response = await postRequest<TokenPayload>(
    AUTH_URL + endpoint,
    payload
  );
  return response;
};
