import { BadRequest, NotFound } from "../responseHandlers/errorHandlers";
import AuthRepository from "../repositories/authRepository";
import UserRepository from "../repositories/userRepository";
import { IAuthDTO, IAuthPayload } from "../types/authDTOs";
import { comparePassword, signToken } from "../utils/auth";
import bcrypt from "bcrypt";

const repository = new AuthRepository();
const userRepository = new UserRepository();

export default class AuthService {
  async login(loginRequest: IAuthDTO): Promise<IAuthPayload> {
    const { discord_tag, password } = loginRequest;

    const user = await repository.getByDiscord(discord_tag);
    if (!user) {
      throw new BadRequest();
    }

    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      throw new BadRequest("User not authenticated");
    }

    const token = signToken(user._id);

    return { token, user_id: user._id };
  }

  async recoverByDiscordTag(discord_tag: string): Promise<string> {
    const user = await userRepository.getByDiscord(discord_tag);
    if (!user) {
      throw new BadRequest();
    }

    // await sendRecoveryEmail(user);
    // recovery has to be thru discord

    return "enviar link para a página de recover password no front";
  }

  async changePassword(id: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userUpdated = await repository.updatePassword(id, hashedPassword);
    if (!userUpdated) {
      throw new NotFound("User");
    }

    return userUpdated._id;
  }
}
