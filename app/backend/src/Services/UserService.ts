import UserModel from '../database/models/User';

class UserService {
  static FindOneByEmail = async (email: string) => {
    const result = await UserModel.findOne({ where: { email } });
    if (!result) return false;

    return result;
  };
}

export default UserService;
