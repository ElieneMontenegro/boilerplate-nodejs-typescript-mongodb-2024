import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../types/userDTOs";
import { InternalError, NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";

const repository = new UserRepository();

export default class UserService {
  async createUser(user: ICreateUserDTO): Promise<IUser> {
    //discord_tag has to be unique
    const discTagExists = await repository.getByDiscord(user.discord_tag);
    if (discTagExists) throw new InternalError();

    const { name, discord_tag } = user;
    const password = await bcrypt.hash(user.password, 10);

    const newUser: ICreateUserDTO = {
      name,
      discord_tag,
      password,
    };

    return repository.create(newUser);
  }

  async getById(_id: string): Promise<IUser> {
    const user = await repository.getById(_id);
    if (!user) throw new NotFound("User");

    return user;
  }

  async getAll(): Promise<IUser[]> {
    return repository.getAll();
  }

  async updateById(_id: string, user: IUpdateUserDTO): Promise<IUser> {
    const wasUpdated = await repository.updateById(_id, user);
    if (!wasUpdated) throw new NotFound("User");

    return repository.getById(_id);
  }

  async deleteById(_id: string): Promise<string> {
    const userDeleted = await repository.deleteById(_id);
    if (userDeleted.deletedCount !== 1) throw new NotFound("User");

    return _id;
  }
}
