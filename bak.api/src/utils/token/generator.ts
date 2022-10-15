import { sign } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../configuration/Configuration';
import { JwtTokenPayload } from './payload';

export function generateAccessToken(payload: JwtTokenPayload) {
    return sign(payload, TOKEN_SECRET, { expiresIn: '1h' });
}
