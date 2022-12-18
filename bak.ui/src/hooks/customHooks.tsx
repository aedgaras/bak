import { CreateToastFnReturn } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { authenticate } from '../services/Requests';
import { JWT_NAME, REFRESH_TOKEN_NAME } from '../utils/constants';
import { sleep, TokenPayload } from '../utils/utils';

export const authenticateUserHook = async (
    toast: CreateToastFnReturn,
    action: 'login' | 'register',
    payload: { username: string; password: string }
): Promise<void> => {
    await authenticate(action === 'login' ? '/login' : '/register', {
        username: payload.username,
        password: payload.password,
    })
        .then((r: AxiosResponse<TokenPayload>) => {
            toast({
                title: 'Success',
                description:
                    action === 'register'
                        ? 'Registered successfully.'
                        : 'Logged in successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            sleep(5000);
            localStorage.setItem(JWT_NAME, r.data.token.split(' ')[1]);
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

