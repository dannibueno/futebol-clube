import { Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UserService from '../Services/UserService';
import tokenGenerate from '../Utils/tokenGenerate';

const JWT_SECRET = process.env.JWT_SECRET || 'senha123';

class LoginController {
  static getOneLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // console.log(req);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await UserService.FindOneByEmail(email);

    if (user === false) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // console.log(user.password);

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // console.log(checkPassword);
    const token = tokenGenerate(user);
    // console.log(token);

    return res.status(200).json({ token });
  };

  //  requisito 12 - pega email do token passado no header no campo authorization,
  //  com email ele busca na base da dados e retorna a Role do user encontrado.

  static async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decoded = verify(authorization, JWT_SECRET) as JwtPayload;
    // console.log(decoded);

    const user = await UserService.FindOneByEmail(decoded.email);

    if (!user) {
      throw new Error();
    }

    return res.status(200).json({ role: user.role });
  }
}

export default LoginController;
