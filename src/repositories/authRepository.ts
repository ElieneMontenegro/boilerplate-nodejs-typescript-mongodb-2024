import userModel from "../database/models/userModel";
import { ICompleteUser } from "../types/authDTOs";
import { IUser } from "../types/userDTOs";

export default class AuthRepository {
  async getByDiscord(discord_tag: string): Promise<ICompleteUser> {
    return userModel
      .findOne({ discord_tag }, "_id name discord_tag password")
      .exec() as unknown as ICompleteUser;
  }

  async updatePassword(_id: string, password: string): Promise<IUser | null> {
    return userModel.findByIdAndUpdate({ _id }, { password });
  }
}
