import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './constants';

export const hashedPassword = (password: string): string => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};
