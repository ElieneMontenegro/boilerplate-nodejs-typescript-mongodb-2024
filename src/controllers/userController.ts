import { Request, Response } from "express";

import UserService from "../services/userServices";
import { ICreateUserDTO, IUpdateUserDTO } from "../types/userDTOs";
import { httpStatusCodes } from "../responseHandlers/statusCodes";

const service = new UserService();

export default class UserController {
  async createUser(req: Request, res: Response) {
    const user: ICreateUserDTO = req.body;

    try {
      const result = await service.createUser(user);

      return res
        .status(httpStatusCodes.CREATED)
        .json({ nome: result.name, tag: result.discord_tag, id: result._id });
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await service.getById(id);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async getUsers(req: Request, res: Response) {
    const result = await service.getAll();

    return res.status(httpStatusCodes.OK).json(result);
  }

  async updateUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user: IUpdateUserDTO = req.body;

    try {
      const result = await service.updateById(id, user);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async deleteUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const name = await service.deleteById(id);

      return res.status(httpStatusCodes.OK).json(`User ${name} was deleted`);
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }
}
