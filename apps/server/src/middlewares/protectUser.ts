import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface UserRequest extends Request {
  userId?: string;
}

export const protectUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    (req as UserRequest).userId = (decoded as any).id;

    next();
  } catch (error: any) {
    res.status(401).json({ msg: 'Not authorized, token failed' });
  }
};
