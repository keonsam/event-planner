import { Request, Response, NextFunction } from "express";
import logger from "./logger";
import JWTService from "../services/jwt.service";
import { UserPayload } from "../types/user";
import ApplicationError from "../types/ApplicationError";

const jwtService = new JWTService();
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("authorization");

  if (!authorization) {
    throw new ApplicationError(401, "Authorization header not found");
  }

  if (!authorization.startsWith("Bearer ")) {
    throw new ApplicationError(
      401,
      "Token must be prefixed with Bearer example: 'Bearer {token}'"
    );
  }
  const token = authorization.substring(7);

  logger.info({ token }, "token retrieved from headers");

  const user = jwtService.decodeJWT(token);

  if (!user || typeof user === "string") {
    throw new ApplicationError(401, "Token is invalid or expired");
  }

  req.user = user as UserPayload;

  logger.info({ req }, "request updated");

  next();
};
