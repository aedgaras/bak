export interface JwtTokenPayload {
    username: string;
}

export const bearerToken = (token: string) => {
    return {token: 'Bearer: ' + token};
}