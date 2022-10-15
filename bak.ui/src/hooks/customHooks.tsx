import { CreateToastFnReturn } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { JWT_NAME } from '../services/Authentication';
import { API_URL } from '../utils/constants';
import { sleep, ToastInfo } from '../utils/utils';

export const fetchThisUser = async (
    toast: CreateToastFnReturn,
    endpoint: string,
    payload: { username: string; password: string },
    successToast: ToastInfo
): Promise<void> => {
    await axios
        .post(API_URL + endpoint, {
            username: payload.username,
            password: payload.password,
        })
        .then((r) => {
            toast({
                title: successToast.title,
                description: successToast.description,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            sleep(5000);
            localStorage.setItem(JWT_NAME, r.data);
            window.location.assign('/');
        })
        .catch((e: AxiosError) => {
            toast({
                title: e.code,
                description: (e.response?.data as string) ?? e.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
};
