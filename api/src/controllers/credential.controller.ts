import { Router, Request, Response, NextFunction } from "express";
import logger from "../middleware/logger";
import { Login, Register } from "../types/credential";
import CredentialService from "../services/credential.service";

const router = Router();

const credentialService = new CredentialService();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Register request received");

    try {
      const cred: Register = req.body;
      const user = await credentialService.register(cred);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Login request received");

    try {
      const auth: Login = req.body;
      const token = await credentialService.login(auth);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
