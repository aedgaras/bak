import { env } from '../utils/constants';

export const TOKEN_SECRET =
    env.TOKEN_SECRET ||
    '24432646294A404E635266556A586E3272357538782F4125442A472D4B615064';

export const API_PORT = env.PORT || 3030;
