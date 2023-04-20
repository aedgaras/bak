import { CreateToastFnReturn } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { TFunction } from 'i18next';
import { AuthService } from '../services';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../utils/constants';
import { TokenPayload } from '../utils/utils';

export const authenticateUserHook = async (
    toast: CreateToastFnReturn,
    action: 'login' | 'register',
    payload: { username: string; password: string },
    t: TFunction<'translation', undefined, 'translation'>
): Promise<void> => {
    const authService = new AuthService();

    await authService
        .authenticate(action === 'login' ? '/login' : '/register', {
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
