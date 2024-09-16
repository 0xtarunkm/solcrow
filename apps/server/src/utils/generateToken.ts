import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from '../config';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_PASSWORD, {
    expiresIn: '30d',
  });
};
