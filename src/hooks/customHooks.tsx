import { CreateToastFnReturn } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { TFunction } from 'i18next';
import { authenticate } from '../services/Requests';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../utils/constants';
import { TokenPayload } from '../utils/utils';

export const authenticateUserHook = async (
    toast: CreateToastFnReturn,
    action: 'login' | 'register',
    payload: { username: string; password: string },
    t: TFunction<'translation', undefined, 'translation'>
): Promise<void> => {
    await authenticate(action === 'login' ? '/login' : '/register', {
        username: payload.username,
        password: payload.password,
    })
        .then((r: AxiosResponse<TokenPayload>) => {
            toast({
                title: 'Toast.Sucess',
                description:
                    action === 'register'
                        ? t('Toast.RegisterSucess').toString()
                        : t('Toast.LoginSucess').toString(),
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            console.log(r.data);

            localStorage.setItem(ACCESS_TOKEN_NAME, r.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_NAME, r.data.refreshToken);
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
