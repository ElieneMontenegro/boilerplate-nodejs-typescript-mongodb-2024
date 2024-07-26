import { ICreateUserDTO, IUser, IUpdateUserDTO } from "../types/userDTOs";

import userModel from "../database/models/userModel";
import mongoose from "mongoose";
import { BaseError } from "../responseHandlers/errorHandlers";

export default class UserRepository {
  async create(user: ICreateUserDTO): Promise<IUser> {
    return userModel.create(user) as unknown as IUser;
  }

  async getById(id: string): Promise<IUser | undefined> {
    if (!mongoose.isValidObjectId(id))
      throw new BaseError("User can't be found", 404);

    return userModel
      .findById(id, "_id name discord_tag")
      .exec() as unknown as IUser;
  }

  async getByDiscord(discord_tag: string): Promise<IUser> {
    return userModel
      .findOne({ discord_tag }, "_id name discord_tag")
      .exec() as unknown as IUser;
  }

  async getAll(): Promise<IUser[]> {
    return userModel
      .find({}, "_id name discord_tag")
      .exec() as unknown as IUser[];
  }

  async updateById(_id: string, user: IUpdateUserDTO) {
    return userModel.findOneAndUpdate({ _id }, user).exec();
  }

  async deleteById(_id: string) {
    return userModel.deleteOne({ _id }).exec();
  }
}
