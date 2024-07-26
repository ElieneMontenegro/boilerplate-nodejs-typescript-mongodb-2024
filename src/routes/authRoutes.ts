import { Router } from "express";
import AuthController from "../controllers/authController";

const authRoutes = Router();
const controller = new AuthController();

authRoutes.post("/login", controller.login);
authRoutes.put("/password/:id", controller.changePassword);
authRoutes.post("/recover/:discord_tag", controller.recoverPassword);

export default authRoutes;
