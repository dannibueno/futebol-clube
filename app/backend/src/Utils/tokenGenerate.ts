import { sign, SignOptions } from 'jsonwebtoken';
import { IUser } from '../Interface/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'senha123';

function tokenGenerate(user: IUser) {
  const jwtConfig:SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  console.log(user);

  const token = sign({ email: user.email }, JWT_SECRET, jwtConfig);
  return token;
}

export default tokenGenerate;
