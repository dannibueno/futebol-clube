import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../Services/UserService';
import tokenGenerate from '../Utils/tokenGenerate';

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

    // const token = await validaToken(email);

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // console.log(checkPassword);
    const token = tokenGenerate(user);
    // console.log(token);

    return res.status(200).json({ token });
  };
}

export default LoginController;
