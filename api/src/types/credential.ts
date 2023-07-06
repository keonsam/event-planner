import { User } from "./user";

export type Credential = {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type CredentialTable = {
  id: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export type Login = {
  username: string;
  password: string;
};

export type Register = User & Credential;


export type JWTData = {
  credentialId: string;
};
