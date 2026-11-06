import jwt, { type SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface JwtPayload {
  id: string;
}

export function signToken(userId: Types.ObjectId | string): string {
  const secret = process.env.JWT_SECRET as string;
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
  };
  return jwt.sign({ id: userId.toString() }, secret, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}
