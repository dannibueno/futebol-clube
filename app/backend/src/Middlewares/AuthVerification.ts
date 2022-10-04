import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserService from '../Services/UserService';

const JWT_SECRET = process.env.JWT_SECRET || 'senha123';

const AuthVerification = async (req: Request, res: Response, next: NextFunction) => {
  // console.log('testando');

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = verify(authorization, JWT_SECRET) as JwtPayload;
    console.log(decoded);

    const user = await UserService.FindOneByEmail(decoded.email);

    // console.log(user);

    if (!user) {
      throw new Error();
    }

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Expired or invalid token' });
  }
};

export default AuthVerification;
