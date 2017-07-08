import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export function sign(user) {

    return jwt.sign(user, new Buffer(config.secrets, 'base64'));
};