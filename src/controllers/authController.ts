import { Request, Response } from "express";
import AuthService from "../services/authService";
import { httpStatusCodes } from "../responseHandlers/statusCodes";
import { IAuthDTO } from "../types/authDTOs";

const service = new AuthService();

export default class AuthController {
  async login(req: Request, res: Response) {
    try {
      const loginRequest: IAuthDTO = req.body;

      const result = await service.login(loginRequest);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const result = await service.changePassword(id, password);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async recoverPassword(req: Request, res: Response) {
    try {
      const { discord_tag } = req.params;

      const result = await service.recoverByDiscordTag(discord_tag);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }
}
