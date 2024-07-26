import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { InternalError } from "../responseHandlers/errorHandlers";

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const signToken = (id: string) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new InternalError("Environment variables.");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
