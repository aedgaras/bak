/**
 * User entity name.
 */
export const UserEntityName = 'User';
/**
 * Organization entity name.
 */
export const OrganizationEntityName = 'Organization';

/**
 * Password salts.
 */
export const SALT_ROUNDS = 8;

/**
 * Current environment.
 */
export const env = process.env;

export const TOKEN_SECRET =
    env.TOKEN_SECRET ||
    '24432646294A404E635266556A586E3272357538782F4125442A472D4B615064';

export const REFRESH_SECRET = env.REFRESH_SECRET || '3RXRjvZ3D4SdcT0A65X9RA';

export const API_PORT = env.PORT || 3030;
