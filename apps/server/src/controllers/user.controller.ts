import { Request, Response } from 'express';
import prisma from '@repo/db';
import { loginSchema, registerSchema } from '@repo/common/types';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { UserRequest } from '../middlewares/protectUser';

export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(411).json({
        message: 'Incorrect inputs',
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!existingUser) {
      return res.status(403).json({
        message: 'User does not exist please register yourself',
      });
    }

    const isMatch = await bcrypt.compare(
      parsedData.data.password,
      existingUser.password
    );

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(existingUser.id);

    res.status(200).json({
      msg: 'Login successfull',
      token,
    });
  } catch (error: any) {
    throw new Error('login failed', error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(411).json({
        message: 'Incorrect inputs',
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (existingUser) {
      return res.status(403).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 8);

    await prisma.user.create({
      data: {
        email: parsedData.data.email,
        firstName: parsedData.data.firstName,
        lastName: parsedData.data.lastName,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'user successfully created',
    });
  } catch (error: any) {
    throw new Error('register failed', error);
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.user.findUnique({
      where: { id: (req as UserRequest).userId },
      select: { id: true, name: true, email: true },
    });

    res.status(200).json({ admin });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
