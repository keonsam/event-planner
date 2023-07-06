import logger from "../middleware/logger";
import { Login, Register } from "../types/credential";
import bcrypt from "bcrypt";
import JWTService from "./jwt.service";
import CredentialRepository from "../repositories/credential.repository";
import { UserRepository } from "../repositories/user.repository";
import ApplicationError from "../types/ApplicationError";

export default class CredentialService {
  private credentialRepository: CredentialRepository;
  private userRepository: UserRepository;
  private jwtService: JWTService;

  constructor() {
    this.credentialRepository = new CredentialRepository();
    this.userRepository = new UserRepository();
    this.jwtService = new JWTService();
  }

  async register(auth: Register) {
    const { username, password, firstName, lastName } = auth;

    // confirm username does not exist
    const savedCredential =
      await this.credentialRepository.getCredentialByUsername(username);

    // throw error if user exist
    if (savedCredential?.id) {
      throw new ApplicationError(409, "User already exist with that username.");
    }

    // create credential
    const hashedPassword = await bcrypt.hash(password, 10);
    logger.info(`Register user hashedPassword: ${hashedPassword}`);

    const credential = await this.credentialRepository.createCredential({
      username,
      password: hashedPassword,
    });

    // add user data to User table
    const user = await this.userRepository.createUser({
      credentialId: credential.id,
      firstName,
      lastName,
    });

    return user;
  }

  async login(auth: Login) {
    const { username, password } = auth;

    // verify username
    const savedCredential =
      await this.credentialRepository.getCredentialByUsername(username);

    if (!savedCredential?.id) {
      throw new ApplicationError(404, `User does not exist with username: ${username}`);
    }

    // verify password
    const valid = await bcrypt.compare(password, savedCredential.password);

    if (!valid) {
      throw new ApplicationError(401, `Invalid password: ${password}`);
    }

    // generate jwt
    const token = this.jwtService.signJWT({ credentialId: savedCredential.id });

    logger.info({ token }, "token successfully generated");

    return { token };
  }
}
