import * as bcrypt from 'bcrypt';
export const SALT_ROUNDS = 8;

export const hashedPassword = (password: string): string => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};